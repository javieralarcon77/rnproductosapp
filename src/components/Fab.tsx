import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Platform, TouchableOpacity, Dimensions } from 'react-native';

interface Props{
    title: string;
    position?: 'bl' | 'br' | 'bm';
    onPress: () => void; 
}

const Fab = ( { title, onPress, position = 'br' }:Props ) => {
    
    const ios = () => {
        return (
            <TouchableOpacity
                onPress={ onPress }
                activeOpacity={ 0.8 }
                style={ [
                    styles.fabLocation, 
                    ( position === 'bl' ? styles.left : ( position === 'bm' ? styles.middle : styles.rigth ) )
                ] }
            >
                <View style={ styles.fab }>
                    <Text style={ styles.fabtext }>
                        { title }
                    </Text>
                </View>                
            </TouchableOpacity> 
        )
    }

    const android = () => {
        return (
            <View
                style={ [
                    styles.fabLocation, 
                    ( position === 'bl' ? styles.left : ( position === 'bm' ? styles.middle : styles.rigth ) )
                ] }
            >
                <TouchableNativeFeedback
                    onPress={ onPress }
                    background={ TouchableNativeFeedback.Ripple('#2B425B',false, 30) }
                >
                    <View style={ styles.fab }>
                        <Text style={ styles.fabtext }>
                            { title }
                        </Text>
                    </View>                
                </TouchableNativeFeedback> 
            </View>
        )
    }

    return  (Platform.OS === 'ios') ? ios() : android();    
}

const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    fabLocation:{
        position: 'absolute',
        bottom: 25,
        borderRadius:100
    },
    rigth:{
        right: 0,
    },
    left:{
        left: 0
    },
    middle:{
        left: ( widthScreen / 2 ) - 30,

    },
    fab:{
        backgroundColor: '#5856D6',
        width: 60,
        height: 60,
        borderRadius: 100,
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    fabtext:{
        color:'white',
        fontSize: 25,
        fontWeight:'bold',
        alignSelf:'center'
    }
});

export default Fab
