// Generated by https://quicktype.io

export interface FormLogin{
    email:string,
    password:string,
}

export interface FormRegister{
    name: string,
    email:string,
    password:string,
}

export interface LoginResponse {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    rol:    string;
    estado: boolean;
    google: boolean;
    nombre: string;
    correo: string;
    uid:    string;
    img?:  string;
}

//Productos
export interface ProductsResponse {
    total:     number;
    productos: Producto[];
}

export interface Producto {
    precio:    number;
    _id:       string;
    nombre:    string;
    categoria: Categoria;
    usuario:   Categoria;
    img?:      string;
}

export interface Categoria {
    _id:    string;
    nombre: string;
    usuario?: CreadoPor;
}
export interface CategoriesResponse {
    total:      number;
    categorias: Categoria[];
}
export interface CreadoPor {
    _id:    string;
    nombre: string;
}
