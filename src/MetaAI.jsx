import React, { useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import W_bg from './assets/w_bg.png'
import CustomHeader from './components/CustomHeader'
import { useDispatch, useSelector } from 'react-redux'
import { changeCurrentChatId, selectChats, selectCurrentChatId } from './redux/reducers/chatSlice'
import SendButton from './components/SendButton'
import Chat from './components/Chat'

const MetaAI = () => {
  const dispatch = useDispatch()
  const chats = useSelector(selectChats)
  const currentChatId = useSelector(selectCurrentChatId)
  const [isTyping, setIsTyping] = useState(false)
  const [heightOfMessageBox, setHeightOfMessageBox] = useState(0)



  const selectCurrentChat_Id = (id) => {
    dispatch(changeCurrentChatId({ chatId: id }))
  }

  return (
    <ImageBackground source={W_bg} style={styles.container} resizeMode='cover'>
      <CustomHeader
        currentChatId={currentChatId}
        chats={chats}
        setCurrentChatId={id => selectCurrentChat_Id(id)}
      />
      <Chat
        isTyping={isTyping}
        messages={chats?.find(chat => chat.id === currentChatId)?.messages || []}
        heightOfMessageBox={heightOfMessageBox}
      />
      <SendButton
        isTyping={isTyping}
        setHeightOfMessageBox={setHeightOfMessageBox}  // Fixed prop name
        heightOfMessageBox={heightOfMessageBox}
        setIsTyping={setIsTyping}
        currentChatId={currentChatId}
        selectCurrentChat_Id={id => selectCurrentChat_Id(id)}
        length={chats?.find(chat => chat.id === currentChatId)?.messages?.length || 0}
        message={chats?.find(chat => chat.id === currentChatId)?.messages || []}
      />
    </ImageBackground>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
export default MetaAI
