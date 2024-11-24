import { View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from './CustomText'
import useKeyboardOffsetHeight from '../helpers/useKeyboardOffsetHeight'
import { useDispatch, useSelector } from 'react-redux'
import { addAssistantMessage, addMessage, createNewChat, markMessageAsRead, selectChats, selectCurrentChatId, updateAssistantMessage, updateChatSummary } from '../redux/reducers/chatSlice'
import { PaperAirplaneIcon } from 'react-native-heroicons/solid'
import { HUGGING_API_KEY, HUGGING_API_URL } from '../redux/API'
import uuid from 'react-native-uuid'

const windowHeight = Dimensions.get('window').height

const SendButton = ({
    isTyping,
    setIsTyping,
    selectCurrentChat_Id,
    setHeightOfMessageBox,
    length,
    messages
}) => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const chats = useSelector(selectChats)
    const currentChatId = useSelector(selectCurrentChatId)
    const animationValue = useRef(new Animated.Value(0)).current

    const [message, setMessage] = useState('')
    const keyboardOffsetHeight = useKeyboardOffsetHeight()

    const handleChangeText = (text) => {
        setIsTyping(!!text);
        setMessage(text)
    }
    const handleContentSizeChange = (event) => {
        setHeightOfMessageBox(event?.nativeEvent?.contentSize?.height);
    }

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: isTyping ? 1 : 0,
            duration: 600,
            useNativeDriver: true
        }).start()
    }, [isTyping])

    const sendButtonStyle = {
        opacity: animationValue,
        transform: [
            {
                scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                })
            }
        ]
    }


    const fetchResponse = async (mes, selectedChatId) => {
        console.log('fetch response called')
        let id = length + 2
        
        dispatch(addAssistantMessage({
            chatId: selectedChatId,
            message: {
                content: 'Loading...',
                time: mes.time,
                role: 'assistant',
                id: id,
            }
        }))

        try {
            const response = await fetch(HUGGING_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${HUGGING_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "meta-llama/Meta-Llama-3-8B-Instruct",
                    messages: [
                        {
                            role: "user",
                            content: mes.content
                        }
                    ],
                    max_tokens: 500,
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            const generatedText = data.choices?.[0]?.message?.content || 'No response generated';
            
            dispatch(updateAssistantMessage({
                chatId: selectedChatId,
                messageId: id,
                message: {
                    content: generatedText,
                    time: new Date().toString(),
                    id: id,
                    role: 'assistant',
                }
            }));

        } catch (error) {
            console.error('Error:', error);
            dispatch(updateAssistantMessage({
                chatId: selectedChatId,
                messageId: id,
                message: {
                    content: 'Error fetching response: ' + error.message,
                    time: new Date().toString(),
                    id: id,
                    role: 'assistant',
                }
            }));
        }
    }


    const generateImage = async (message, selectedChatId) => { }

    const identifyImageApi = prompt => {
        const imageRegex = /\b(generate\*simage|imagine)\b/i
        if (imageRegex.test(prompt)) {
            return true
        }
        return false
    }


    const addChat = async (newId) => {
        console.log('add chat called')
        let selectedChatId = newId ? newId : currentChatId
        let msgId = length + 1
        if (length === 0 && message.trim().length > 0) {
            await dispatch(updateChatSummary({
                chatId: selectedChatId,
                messages: messages,
                summary: message.trim().slice(0, 40)
            }))
        }

        await dispatch(addMessage({
            chatId: selectedChatId,
            message: {
                content: message,
                time: new Date().toString(),
                role: 'user',
                id: msgId,
                isMessageRead: false,
            }
        }))
        inputRef.current.blur()
        setMessage('')
        setIsTyping(false)

        let promptForAssistant = {

            content: message,
            time: new Date().toString(),
            role: 'user',
            id: msgId,
            isMessageRead: false
        }

        console.log('called')
        if (!identifyImageApi(message)) {
            console.log('fetch response called')
            fetchResponse(promptForAssistant, selectedChatId)
        } else {
            generateImage(promptForAssistant, selectedChatId)
        }
        dispatch(markMessageAsRead({
            chatId: selectedChatId,
            messageId: length + 1
        }))
    }

    return (
        <View style={[styles.container, {
            bottom: Platform.OS === 'android' ? windowHeight * 0.02 : Math.max(
                keyboardOffsetHeight + 35, windowHeight * 0.05
            )
        }]}>
            <View style={styles.subContainer}>
                <View style={[styles.inputContainer, isTyping && { width: '87%' }]}>
                    <TextInput
                        ref={inputRef}
                        value={message}
                        editable
                        multiline
                        style={styles.textInput}
                        placeholder='Type a message'
                        placeholderTextColor='#808080'
                        onChangeText={handleChangeText}
                        onContentSizeChange={handleContentSizeChange}
                    />
                </View>
                {isTyping && (
                    <Animated.View style={[styles.sendButtonWrapper, sendButtonStyle]}>
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                            ]}
                            onPress={async () => {
                                if (!message.trim()) {
                                    return;
                                }

                                const chatIndex = chats.findIndex(
                                    (chat) => chat.id === currentChatId
                                );
                                
                                console.log('Chat Index:', chatIndex);
                                console.log('Current Chat ID:', currentChatId);
                                
                                if (chatIndex === -1) {
                                    console.log('Creating new chat...');
                                    const newId = uuid.v4();
                                    selectCurrentChat_Id(newId);
                                    dispatch(createNewChat({
                                        chatId: newId,
                                        messages: [],
                                        summary: "New Chat!"
                                    }));
                                    await addChat(newId);
                                } else {
                                    console.log('Adding to existing chat...');
                                    await addChat(currentChatId);
                                }
                                setMessage('');
                                setIsTyping(false);
                            }}>
                            <PaperAirplaneIcon size={20} color='black' />
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: windowHeight * 0.06,
        maxHeight: windowHeight * 0.06,
        paddingHorizontal: '1%',
        paddingVertical: 10,
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        alignContent: 'center',
    },
    subContainer: {
        flex: 1,
        width: '100%',
    },
    inputContainer: {
        maxHeight: windowHeight * 0.06,
        backgroundColor: '#232626',
        margin: '1%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '1%',
        borderRadius: 20,
        width: '98%'
    },
    textInput: {
        width: '98%',
        padding: 10,
        marginHorizontal: '2%',
        fontSize: RFValue(15),
        color: '#fff',
        height: 45
    },
    sendButton: {
        backgroundColor: '#22c063',
        borderRadius: 42,
        height: 42,
        width: 42,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendButtonDisabled: {
        backgroundColor: '#1a914ab',
    },
    sendButtonWrapper: {
        position: 'absolute',
        right: 0,
        top: 28,
        bottom: 6,
        width: '11%',
        justifyContent: 'center',
        alignContent: 'center'
    },
})

export default SendButton