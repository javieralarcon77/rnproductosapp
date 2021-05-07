import React, { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces/appInterfaces';
import cafeApi from '../api/cafeApi';
import { ImagePickerResponse } from 'react-native-image-picker';

type ProductsContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: ( categoryId: string, productName: string ) => Promise<Producto>;
    updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
    deleteProduct: ( id: string ) => Promise<void>;
    loadProductById: ( id: string ) => Promise<Producto>;
    uploadImage: ( data: any, id: string ) => Promise<void>; // TODO: cambiar ANY
}



export const ProductsContext = createContext({} as ProductsContextProps);



export const ProductsProvider = ({ children }: any ) => {

    const [products, setProducts] = useState<Producto[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async() => {
        try{
            const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50')
            setProducts(resp.data.productos);
        }catch(e){
            console.log(e);
        }
    }

    const addProduct = async( categoryId: string, productName: string ) => {
        try{
            const resp = await cafeApi.post<Producto>('/productos',{
                nombre: productName,
                categoria: categoryId,
            });

            setProducts([
                ...products,
                resp.data
            ]);
            return resp.data;
        }catch(e){
            return {} as Producto;
        }

    }

    const updateProduct = async( categoryId: string, productName: string, productId: string ) =>{
        try{
            const resp = await cafeApi.put<Producto>(`/productos/${ productId }`,{
                nombre: productName,
                categoria: categoryId,
            });

            setProducts( products.map( p => 
                ( p._id === productId ) ? resp.data : p
            ) )

        }catch(e){
            console.log(e);
        }
    }

    const deleteProduct = async( id: string ) => {
        
    }

    const loadProductById = async ( id: string ) => {
        const resp = await cafeApi.get<Producto>(`/productos/${id}`);
        return resp.data;
    };

    // TODO: cambiar ANY
    const uploadImage = async ( data: ImagePickerResponse, productoId: string ) => {
        
        const fileToUpload = {
            uri: data.uri,
            type: data.type,
            name: data.fileName,
        }

        const formData = new FormData();
        formData.append('archivo', fileToUpload );

        try{
            const resp = await cafeApi.put(`/uploads/productos/${ productoId }`, formData);
            console.log(resp.data);

        }catch(e){
            console.log(e);
        }


    }

    return(
        <ProductsContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            loadProductById,
            uploadImage,
        }}>
            { children }
        </ProductsContext.Provider>
    )
}