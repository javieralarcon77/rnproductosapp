import { useState, useEffect } from 'react'
import cafeApi from '../api/cafeApi';
import { Categoria, CategoriesResponse } from '../interfaces/appInterfaces';

export const useCategories = () => {
    
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    const getCategories = async () => {
        try{
            const resp = await cafeApi.get<CategoriesResponse>('/categorias');
            setCategories( resp.data.categorias );
            setIsLoadingCategories(false);
        }catch(e){
            console.log(e);
            setIsLoadingCategories(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return {
        isLoadingCategories,
        categories,
    }
}
