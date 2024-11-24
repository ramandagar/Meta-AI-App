import { combineReducers } from '@reduxjs/toolkit'
import chatSlice from './reducers/chatSlice'

const rootReducer = combineReducers({
    chat: chatSlice
})

export default rootReducer