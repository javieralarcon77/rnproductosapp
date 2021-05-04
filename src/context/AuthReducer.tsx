import { Usuario, LoginResponse } from '../interfaces/appInterfaces';

export interface AuthState{
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string,
    user: Usuario | null;
}

type AuthAction =
    | { type: 'addError', payload:string }
    | { type: 'removeError' }
    | { type: 'signUp', payload:LoginResponse }
    | { type: 'logout' } //si se presiona salir se ejecuta esta accion
    | { type: 'notAuthenticated' } //si el token no es valido se dispara esta accion


export const authReducer = (state:AuthState, action:AuthAction) : AuthState => {
    switch( action.type ){
        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: "",
            }
        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                user: action.payload.usuario,
                token: action.payload.token,
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                user: null,
                token: null,
            }
        
        default:
            return state;
    }
}