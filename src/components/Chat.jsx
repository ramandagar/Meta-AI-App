import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import useKeyboardOffsetHeight from '../helpers/useKeyboardOffsetHeight'
import getMessageHeightOffset from '../helpers/getMessageHeightOffset'
import MessageBubble from './MessageBubble'
import { FlashList } from '@shopify/flash-list'
import EmptyComponent from './EmptyComponent'


const windowHeight = Dimensions.get('window').height

const Chat = ({
    isTyping,
    messages,
    heightOfMessageBox
}) => {
    const keyboardOffsetHeight = useKeyboardOffsetHeight()





    return (
        <View style={{
            height: windowHeight * 0.76 - keyboardOffsetHeight * 0.95 - getMessageHeightOffset()
        }}>
            {console.log('messages',messages?.length)}
            {messages?.length <=0 ?
                (<EmptyComponent isTyping={isTyping} />) :
                (
                    <FlashList
                        indicatorStyle='black'
                        data={[...messages].reverse()}
                        inverted
                        estimatedItemSize={40}
                        renderItem={({ item }) => (
                            <MessageBubble message={item} />
                        )}
                    />
                )}
        </View>
    )
}

export default Chat