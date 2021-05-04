import React from 'react'
import { View, Text, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import WhiteLogo from '../components/WhiteLogo'
import { loginStyles } from '../loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any>{}

interface FormRegister{
    name: string,
    email:string,
    password:string,
}


const RegisterScreen = ({ navigation }:Props) => {

    const { email, password, name, form, onChange } = useForm<FormRegister>({
        name:"",
        email:"",
        password:"",
    })

    const onRegister = () => {
        console.log({ email, password, name });
        Keyboard.dismiss();
    }

    return (
        <>
            {/** cuerpo de funcion */}
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor:'#5856D6' }}
                behavior={ (Platform.OS ===  'ios') ? 'padding' : 'height' }
            >

                <View style={ loginStyles.formContainer }>
                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Registro</Text>

                    <Text style={ loginStyles.label }>Nombre: </Text>
                    <TextInput  
                        placeholder="Ingrese su nombre:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={ [
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' && loginStyles.inputBorder )
                        ] }
                        selectionColor="white"
                        autoCapitalize="words"
                        autoCorrect={ false }
                        
                        value={ name }
                        onChangeText={ ( value )=>{ onChange(value,'name') } }
                        onSubmitEditing={ onRegister }
                    />

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
                        onSubmitEditing={ onRegister }
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
                        onSubmitEditing={ onRegister }
                    />

                    {/* Botones */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onRegister }
                        >
                            <Text style={ loginStyles.buttonText }>Crear Cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/** Crear una nueva cuenta */}
                    <View style={ loginStyles.buttonSecondaryContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ ()=>{
                                navigation.replace('LoginScreen');
                            } }
                        >
                            <Text style={ loginStyles.buttonText }>Ingresar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default RegisterScreen
