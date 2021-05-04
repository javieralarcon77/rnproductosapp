import React, { createContext, useReducer } from "react";
import cafeApi from "../api/cafeApi";
import { Usuario, LoginResponse } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';

type AuthContextProps = {
    errorMessage: string,
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signIn: (correo:string, password:string) => void;
    signUp: () => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialState:AuthState = {
    status:'checking',
    token:null,
    errorMessage:'',
    user: null,
}

export const AuthContext = createContext({} as AuthContextProps);
 
export const AuthProvider = ({ children }:any) => {

    const [ state, dispatch ] = useReducer( authReducer, authInitialState);

    const signIn = async ( correo:string, password:string ) => {
        try {
            
            const resp = await cafeApi.post<LoginResponse>('/auth/login',{
                correo: correo,
                password: password
            })
            dispatch({
                type:'signUp',
                payload: resp.data,
            })
            
        } catch (error) {
            if(error.response.status === 400){
                dispatch({ 
                    type:'addError', 
                    payload: error.response.data.msg || 'Informacion Incorrecta'
                })
            }
        }
    }


    const signUp = () => {
        console.log('signIn');
    }
    const logOut = () => {
        console.log('logOut');
    }
    const removeError = () => {
        dispatch({type:'removeError'});
    }

    return (
        <AuthContext.Provider
            value={ {
               ...state,
               signUp,
               signIn,
               logOut,
               removeError,
            } }
        >
            { children }
        </AuthContext.Provider>
    )
}