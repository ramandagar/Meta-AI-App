import { useEffect, useState } from "react"
import { Keyboard } from "react-native"

export default function useKeyboardOffsetHeight(){
    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0)

useEffect(()=>{
    const keyboardWillAndroidShowListner = Keyboard.addListener('keyboardDidShow', (e) => {
        setKeyboardOffsetHeight(e.endCoordinates.height)
    })
   
    const keyboardWillAndroidHideListner = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardOffsetHeight(0)
    })

    const keyboardWillHideListner = Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardOffsetHeight(0)
    })

    const keyboardWillShowListner = Keyboard.addListener('keyboardWillShow', (e) => {
        setKeyboardOffsetHeight(e.endCoordinates.height)
    })

    return () => {
        keyboardWillAndroidShowListner.remove()
        keyboardWillAndroidHideListner.remove()
        keyboardWillHideListner.remove()
        keyboardWillShowListner.remove()
    }
},[])

    return keyboardOffsetHeight
}
