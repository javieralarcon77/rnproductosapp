import React, { useContext } from 'react'
import { View, Text, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import Background from '../components/Background'
import WhiteLogo from '../components/WhiteLogo'
import { loginStyles } from '../loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any>{}

interface FormLogin{
    email:string,
    password:string,
}


const LoginScreen = ({ navigation }:Props) => {

    const { signIn } = useContext( AuthContext );

    const { email, password, form, onChange } = useForm<FormLogin>({
        email:"",
        password:"",
    })

    const onLogin = () => {
        Keyboard.dismiss();
        
        signIn(email, password);
    }

    return (
        <>
            {/**  Background */}
            <Background />

            {/** cuerpo de funcion */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS ===  'ios') ? 'padding' : 'height' }
            >

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
                        
                        value={ email }
                        onChangeText={ ( value )=>{ onChange(value,'email') } }
                        onSubmitEditing={ onLogin }
                    />

                    <Text style={ loginStyles.label }>Contraseña: </Text>
                    <TextInput  
                        placeholder="******"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry
                        style={ [
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' && loginStyles.inputBorder )
                        ] }
                        selectionColor="white"
                        autoCapitalize='none'
                        autoCorrect={ false }
                        
                        value={ password }
                        onChangeText={ ( value )=>{ onChange(value,'password') } }
                        onSubmitEditing={ onLogin }
                    />

                    {/* Botones */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onLogin }
                        >
                            <Text style={ loginStyles.buttonText }>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/** Crear una nueva cuenta */}
                    <View style={ loginStyles.buttonSecondaryContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ ()=>{
                                navigation.replace('RegisterScreen');
                            } }
                        >
                            <Text style={ loginStyles.buttonText }>Nueva Cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default LoginScreen
