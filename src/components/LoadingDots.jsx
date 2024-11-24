import { View, Text, Animated, StyleSheet, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const LoadingDots = () => {
  const [animatedValues] = useState(
    Array.from({ length: 3 }, () => new Animated.Value(1))
  )


  const startAnimation = () => {
    Animated.loop(
      Animated.stagger(
        100,
        animatedValues.map(val =>
          Animated.sequence([
            Animated.timing(val, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
              easing: Easing.linear
            }),
            Animated.timing(val, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
              easing: Easing.linear
            })
          ])
        )
      )
    ).start()
  }

  const resetAnimation = () => {
    animatedValues.forEach(val => val.setValue(1))
  }

  useEffect(() => {
    startAnimation()
    return () => resetAnimation()
  }, [])
  return (
    <View style={styles.container}>
      {animatedValues.map((animatedValue, index) => (
        <Animated.View style={[styles.dot, {
          transform: [{
            scale: animatedValue
          }],
          marginRight: 4
        }]} key={index} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignSelf: 'center',
    marginLeft: 20,
    height: 14
  },
  dot: {
    width: RFValue(5),
    height: RFValue(5),
    borderRadius: 55,
    backgroundColor: 'grey'
  }
})

export default LoadingDots