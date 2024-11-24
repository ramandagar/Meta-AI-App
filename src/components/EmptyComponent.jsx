import { View, Text, StyleSheet, Animated, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import MetaAILogo from '../assets/logo_t.png'
import CustomText from './CustomText'


const exampleData=[
  '🥊 AI trends 2024',
  '🚀 Space Exploration Update',
  '🤖 AI in Healthcare',
  '💰 Crypto Market Analysis',
  '🎨 Artistic Style Transfer',
  '🎤 Voice Generation',
  '🧠 AI in Psychology',
  '🧬 Genomics and AI',
  '🌐 Web Development Trends',
  '💵 Financial Market Insights',
  '🧵 Textile Manufacturing',
  '🧼 Personal Care Products',
  '🍏 Agriculture and AI',
  '🏢 Real Estate Market Trends',
  '🚗 Automotive Industry Update',
  '🎥 Film and TV Production',
  '🎹 Music Composition',
  '🎲 Gambling and AI',
]

const EmptyComponent = ({isTyping}) => {
  const rotation = useRef(new Animated.Value(0)).current
  useEffect(()=>{
    Animated.loop(
      Animated.timing(rotation, {toValue:1, duration:4000, useNativeDriver:true})
    ).start()
  },[])

const ItemScroll = ({item}) => {
  return (
    <TouchableOpacity style={styles.touchableItem}>
      <Text style={styles.touchableText}>{item}</Text>
    </TouchableOpacity>
  )
}


  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Animated.Image 
        source={MetaAILogo} style={[styles.img, {transform:[{
          rotate:rotation.interpolate({inputRange:[0,1], outputRange:['0deg', '360deg']})}]}]} />
      </View>
      <CustomText size={RFValue(20)} >Ask me anything</CustomText>
      {!isTyping && (
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} centerContent={true} horizontal showsHorizontalScrollIndicator={false} >
          <View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {exampleData.slice(0,7).map((item, index) => (
                <ItemScroll item={item} key={index} />
              ))}
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {exampleData.slice(7,14).map((item, index) => (
                <ItemScroll item={item} key={index} />
              ))}
            </View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {exampleData.slice(14,21).map((item, index) => (
                <ItemScroll item={item} key={index} />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imgContainer:{
        height:RFValue(100),
        width:RFValue(100),
    },
    img:{
        height:'100%',
        width:'100%',
        resizeMode:'cover',
    },
    scrollContainer:{
     marginTop:20,
     maxHeight:RFValue(120),
    },
    scrollContent:{
      alignItems:'center',
    },
    touchableItem:{
      borderRadius:20,
      marginHorizontal:10,
      marginBottom:10,
      backgroundColor:'black',
      padding:10
    },
    touchableText:{
      fontSize:RFValue(12),
      color:'white',
      }
})

export default EmptyComponent