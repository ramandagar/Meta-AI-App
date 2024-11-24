import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import dayjs from 'dayjs'
import TickIcon from '../assets/tick.png'
import MarkdownDisplay from 'react-native-markdown-display'
import LoadingDots from './LoadingDots'
const MessageBubble = ({ message }) => {
  const isMyMessage = message?.role === 'user'
  const isMessageRead = message?.isMessageRead
  return (
    <View style={{
      ...styles.messageContainer,
      maxWidth: isMyMessage ? '80%' : '92%',
      alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
      backgroundColor: isMyMessage ? '#154d37' : '#272626',
      borderTopLeftRadius: isMyMessage ? 5 : 0,
      borderTopRightRadius: isMyMessage ? 0 : 0,
    }}>

      {!isMyMessage &&
        <View style={{
          ...styles.leftMessgaeArrow,
          display: isMyMessage ? 'none' : 'flex',
        }} />
      }
      {message?.isLoading ? (
        <LoadingDots />
      ) : (
        message?.imageUri ? (
          <Image source={{ uri: message?.imageUri }} style={styles.img} />
        ) : (
          <MarkdownDisplay
            style={{
            body: {
              ...styles.messageText,
              left: isMyMessage ? 10 : 0,
              marginVertical: 0,
              paddingVertical: 0
            },
            link: {
              color: 'white',
              backgroundColor: '#1d211e',
              borderLeftWidth: 0,
              borderRadius: 4
            },
            table: {
              borderColor: 'white',
            },
            code_inline: {
              backgroundColor: '#1d211e',
              color: 'white',
              borderRadius: 5,
              fence: {
                backgroundColor: '#1d211e',
                color: 'white',
                borderRadius: 5,
                borderTopWidth: 0,
              },
              tr: {
                borderColor: 'white',
              }
            }

          }}
        >
          {message.content}
          </MarkdownDisplay>
        )
      )}



      {isMyMessage &&
        <View style={{
          ...styles.rightMessageArrow,
          right: 0, top: 0,
          display: isMessageRead ? 'none' : 'flex'
        }} />
      }
      <View style={{ ...styles.timeAndReadContainer, right: 0 }}>
        <Text style={styles.timeText}>{
          dayjs(message?.time).format('HH:mm A')
        }</Text>
        {isMyMessage &&
          <View style={{
          }}>
            <Image
              source={TickIcon}
              tintColor={isMessageRead ? '#53a6fd' : '#8aa69d'}
              style={{
                width: 15,
                height: 15
              }}
            />
          </View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  messageContainer: {
    minWidth: '24%',
    marginVertical: 8,
    marginHorizontal: 10,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 10,
    borderRadius: 10,
    paddingHorizontal: 10
  },
  messageText: {
    fontSize: RFValue(11.4),
    color: 'white',
    marginRight: 15,
    marginBottom: 10,
  },
  leftMessgaeArrow: {
    height: 0,
    width: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderTopColor: '#232626',
    borderTopWidth: 10,
    alignSelf: 'flex-start',
    borderRightColor: 'transparent',
    left: -10,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  rightMessageArrow: {
    height: 0,
    width: 0,
    position: 'absolute',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopColor: '#154d37',
    borderTopWidth: 10,
    alignSelf: 'flex-start',
    left: 93,
    bottom: 0,
  },
  timeAndReadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 4,
    position: 'absolute',
    paddingHorizontal: 10,
    gap: 2
  },
  timeText: {
    fontSize: RFValue(10),
    color: '#808080',
    fontWeight: '400',
    color: '#8aa69d'
  },
  img:{
    height:RFPercentage(20),
    width:RFPercentage(35),
    resizeMode:'cover',
    left:-5,
    aspectRatio:4/4,
    borderRadius:20
  }
})


export default MessageBubble