import React from 'react'
import { View, Text } from 'react-native'

const Background = () => {
    return (
        <View
            style={{
                position: 'absolute',
                backgroundColor:'#5856D6',
                top: -280,
                left: -250,
                width: 1000,
                height: 800,
                transform:[{
                    rotate: '-75deg'
                }],
                
            }}
        />
    )
}

export default Background
