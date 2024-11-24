import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Bars3BottomLeftIcon, CheckCircleIcon } from 'react-native-heroicons/solid'
import { RFValue } from 'react-native-responsive-fontsize'
import MetaILogo from '../assets/logo_s.jpeg'
import CustomText from './CustomText'
import { clearAllChats, clearChat } from '../redux/reducers/chatSlice'
import { useDispatch } from 'react-redux'
import SideDrawer from './SideDrawer'

const CustomHeader = ({
  currentChatId,
  chats,
  setCurrentChatId
}) => {
  const dispatch = useDispatch()



  const onClearChat = async () => {
    dispatch(clearChat({ chatId: currentChatId }))
  }

  const [visible, setVisible] = useState(false)


  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.subContainer}>
          <TouchableOpacity onPress={()=>setVisible(true)}>
            <Bars3BottomLeftIcon color='white' size={RFValue(25)} />
          </TouchableOpacity>
          <View style={styles.flexRow}>
            <Image source={MetaILogo} style={styles.img} />
            <View>
              <CustomText fontWeight='bold'>
                Meta AI <CheckCircleIcon color='#27d366' size={16} />
              </CustomText>
              <CustomText fontWeight='500' opacity={0.7}>
                with Llama 3
              </CustomText>
            </View>
          </View>
          <TouchableOpacity onPress={onClearChat}>
            <CustomText size={14}>
              Clear
            </CustomText>
          </TouchableOpacity>
        </View>
        <SideDrawer
          setCurrentChatId={id => setCurrentChatId(id)}
          chats={chats}
          onPressHide={() => setVisible(false)}
          visible={visible}
          currentChatId={currentChatId}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(20, 25, 46, 1)',
    borderBottomWidth: 0.18,
    borderBottomColor: 'rgba(62, 62, 63, 1)',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  img: {
    width: 38,
    height: 38,
    borderRadius: 40
  },
})

export default CustomHeader