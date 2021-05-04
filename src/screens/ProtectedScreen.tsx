import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { AuthContext } from '../context/AuthContext';

const ProtectedScreen = () => {

    const { user, logOut } = useContext( AuthContext );

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Usuario</Text>
            <Text style={ styles.text }>
                { JSON.stringify(user, null, 5) }
            </Text>
            <Button  
                color="#5856D6"
                title="Logout"
                onPress={ logOut }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontSize: 20,
        marginBottom: 20,
    },
    text:{
        fontSize: 16,
        marginBottom: 20,
    }

});

export default ProtectedScreen
