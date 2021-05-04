import React from 'react'
import { View, Text, TextInput, Platform, TouchableOpacity } from 'react-native'
import Background from '../components/Background'
import WhiteLogo from '../components/WhiteLogo'
import { loginStyles } from '../loginTheme';

const LoginScreen = () => {
    return (
        <>
            {/**  Background */}
            <Background />

            {/** cuerpo de funcion */}
            <View style={ loginStyles.formContainer }>
                <WhiteLogo />

                <Text style={ loginStyles.title }>Login</Text>

                <Text style={ loginStyles.label }>Email: </Text>
                <TextInput  
                    placeholder="Ingrese su email:"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    keyboardType='email-address'
                    underlineColorAndroid="white"
                    style={ [
                        loginStyles.inputField,
                        ( Platform.OS === 'ios' && loginStyles.inputBorder )
                    ] }
                    selectionColor="white"
                    autoCapitalize='none'
                    autoCorrect={ false }
                    //TODO: onchange, value
                    
                />

                <Text style={ loginStyles.label }>Contraseña: </Text>
                <TextInput  
                    placeholder="******"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    underlineColorAndroid="white"
                    style={ [
                        loginStyles.inputField,
                        ( Platform.OS === 'ios' && loginStyles.inputBorder )
                    ] }
                    selectionColor="white"
                    autoCapitalize='none'
                    autoCorrect={ false }
                    //TODO: onchange, value
                    
                />

                {/* Botones */}
                <View style={ loginStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        style={ loginStyles.button }
                    >
                        <Text style={ loginStyles.buttonText }>Login</Text>
                    </TouchableOpacity>
                </View>

                {/** Crear una nueva cuenta */}
                <View style={ loginStyles.buttonSecondaryContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                    >
                        <Text style={ loginStyles.buttonText }>Nueva Cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default LoginScreen
