import { View, Text, StyleSheet, SafeAreaView , Image, TouchableOpacity, FlatList} from 'react-native'
import React from 'react'
import Modal  from 'react-native-modal'
import MetaILogo from '../assets/logo_t.png'
import CustomText from './CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { TrashIcon, XCircleIcon } from 'react-native-heroicons/solid'
import { clearAllChats, clearChat, createNewChat, deleteChat } from '../redux/reducers/chatSlice'
import { useDispatch } from 'react-redux'
import uuid from 'react-native-uuid'
const SideDrawer = ({
  setCurrentChatId,
  chats,
  onPressHide,
  visible,
  currentChatId
}) => {
  const dispatch = useDispatch()
  const onClearAllChats = ()=>{
    dispatch(clearAllChats())
    onPressHide()
  }


  const onDeleteChat = async (chatId)=>{
    dispatch(deleteChat({chatId}))
    onPressHide()
  }

  const addNewChat = ()=>{
    dispatch(createNewChat({
      chatId:uuid.v4(),
      messages:[],
      summary:'New Chat'
    }))
    onPressHide()
  }

  const renderChatItem = ({item})=>{
    return (
    <TouchableOpacity onPress={()=>{
      setCurrentChatId(item.id)
      onPressHide()
    }}
    style={[
      styles.chatBtn,
      {
        backgroundColor:currentChatId===item.id ? '#041e49' : '#131314'
      }
    ]}
    >
      <CustomText size={RFValue(12)} numberOfLines={1} style={{width:'70%'}}>
        {item.summary}
      </CustomText>
      <TouchableOpacity onPress={()=>{onDeleteChat(item.id)}}
      style={styles.trashIcon}
      >
        <TrashIcon color='#ef4444' size={RFValue(14)}/>
      </TouchableOpacity>
    </TouchableOpacity>
    )
  }
  return (
    <Modal
      isVisible={visible}
      style={styles.bottomModalView}
      backdropColor='black'
      backdropOpacity={0.5}
      animationIn='slideInLeft'
      animationOut='slideOutLeft'
      animationInTiming={500}
      animationOutTiming={500}
      onBackdropPress={onPressHide}
      onBackButtonPress={onPressHide}
    >
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <View style={{width:'100%',height:'100%'}}>
         <View style={styles.header}>
          <View style={styles.flexRow}>
            <Image source={MetaILogo} style={{width:30,height:30}} />
            <CustomText size={RFValue(18)} fontWeight='800'>All Chats</CustomText>
          </View>
          <TouchableOpacity onPress={onPressHide}>
            <XCircleIcon color='#ccc' size={RFValue(20)}/>
          </TouchableOpacity>

         </View>
         <TouchableOpacity style={styles.newChat} onPress={addNewChat}>
          <CustomText size={RFValue(10)} fontWeight='500'>+ Add New Chat</CustomText>
         </TouchableOpacity>
         <CustomText style={{margin:10}} size={RFValue(12)} fontWeight='500'>
          Recent Chats
         </CustomText>

         <View style={{height:'60%',}}>
          <FlatList
          data={[...chats].reverse()}
          renderItem={renderChatItem}
          keyExtractor={(item)=>item.id}
          contentContainerStyle={{paddingVertical:10,paddingHorizontal:5}}
          />
         </View>
         <TouchableOpacity style={styles.clearAllChats} onPress={onClearAllChats}>
          <CustomText size={RFValue(10)} fontWeight='500'>
            Clear All Chats
          </CustomText>
         </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bottomModalView: {
    justifyContent:'flex-end',
    width:'70%',
    margin:10
  },
  modalContainer: {
    backgroundColor:'#171717',
    borderRadius:20,
    overflow:'hidden',
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  header: {
    padding:10,
    borderBottomWidth:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderColor:'grey',
    borderBottomWidth:0.5
  },
  flexRow: {
    flexDirection:'row',
    alignItems:'center',
    gap:5
  },
  newChat: {
    padding:10,
    width:'60%',
    margin:10,
    borderRadius:10,
    borderColor:'grey',
    backgroundColor:'#272a2c',
    alignItems:'center'
  },
  clearAllChats: {
    padding:10,
    width:'60%',
    margin:10,
    borderRadius:10,
    borderColor:'grey',
    backgroundColor:'#272a2c',
    alignItems:'center'
  },
  chatBtn: {
    padding:10,
    borderRadius:10,
    borderColor:'grey',
    borderWidth:0.5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:8
  },
  trashIcon: {
    position:'absolute',
    right:10,
    top:5,
    backgroundColor:'white',
    padding:5,
    borderRadius:50
  }
})

export default SideDrawer