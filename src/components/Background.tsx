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
                width: 950,
                height: 600,
                transform:[{
                    rotate: '-75deg'
                }],
                
            }}
        />
    )
}

export default Background
