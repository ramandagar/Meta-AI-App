import { View, Text } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const CustomText = ({
    children,
    size = RFValue(12),
    color = 'white',
    fontWeight = 'normal',
    opacity = 1,
    style,
    ...props
}) => {
    return (
        <Text
            style={[
                {
                    fontSize: size,
                    color: color,
                    fontWeight: fontWeight,
                    opacity: opacity
                },
                style]}
            {...props}>
            {children}
        </Text>
    )
}

export default CustomText