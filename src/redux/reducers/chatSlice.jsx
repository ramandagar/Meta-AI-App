import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    currentChatId: ''
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage:(state,action)=>{
            const {chatId,message} = action.payload
            const chatIndex = state.chats.findIndex(
                (chat) => chat.id === chatId
            )
            if(chatIndex !== -1){
                state.chats[chatIndex].messages.push(message)
            }
        },
       clearAllChats: (state) => {
        state.chats = []
        state.currentChatId = ''
       },
       changeCurrentChatId:(state,action)=>{
        state.currentChatId = action.payload.chatId
       },
       createNewChat:(state,action)=>{
        const {chatId,messages,summary} = action.payload
        state.chats.push({
            id:chatId,
            messages:messages,
            summary:summary
        })
       },
       updateChatSummary:(state,action)=>{
        const {chatId,summary,messages} = action.payload
        const chatIndex = state.chats.findIndex(
            (chat) => chat.id === chatId
        )
        if(chatIndex !== -1){
            state.chats[chatIndex].summary = summary
        }
        if(messages){
            state.chats[chatIndex].messages = messages
        }
       },
       clearChat:(state,action)=>{
        const chatIndex = state.chats.findIndex(
            (chat) => chat.id === action.payload.chatId
        )
        if(chatIndex !== -1){
            state.chats[chatIndex].messages = []
        }
       },
       addAssistantMessage:(state,action)=>{
        const {chatId,message} = action.payload
        const chatIndex = state.chats.findIndex(
            (chat) => chat.id === chatId
        )
        if(chatIndex !== -1){
            state.chats[chatIndex].messages.push({
                ...message,
                isLoading:true
            })
        }
       },
       updateAssistantMessage:(state,action)=>{
        const {chatId,message,messageId} = action.payload
        const chatIndex = state.chats.findIndex(
            (chat) => chat.id === chatId
        )
        if(chatIndex !== -1){
            const messageIndex = state.chats[chatIndex].messages.findIndex(
                (msg) => msg.id === messageId
            )
            if(messageIndex !== -1){
                state.chats[chatIndex].messages[messageIndex] = {
                    ...message,
                    isLoading:false
                }
            }
        }
       },
       deleteChat:(state,action)=>{
        state.chats = state.chats.filter(
            (chat) => chat.id !== action.payload.chatId
        )
       },
       markMessageAsRead:(state,action)=>{
        const {chatId,messageId} = action.payload
        const chat = state.chats.findIndex(
            (chat) => chat.id === chatId
        )
        if(chat){
            const message = state.chats[chat].messages.find(msg=>msg.id===messageId)
            if(message){
                message.isMessageRead = true
            }
        }
       },
       

    }
})

export const {
    clearAllChats,
    changeCurrentChatId,
    createNewChat,
    addMessage,
    clearChat,
    deleteChat,
    updateChatSummary,
    markMessageAsRead,
    addAssistantMessage,
    updateAssistantMessage
} = chatSlice.actions

export const selectChats = (state) => state.chat.chats
export const selectCurrentChatId = (state) => state.chat.currentChatId

export default chatSlice.reducer