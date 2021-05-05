import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../screens/ProductScreen';
import ProductListScreen from '../screens/ProductListScreen';

export type ProductsStackParams = {
    ProductListScreen: undefined,
    ProductScreen: { id?:string, name?:string }
}

const Stack = createStackNavigator<ProductsStackParams>();

const ProductsNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle:{
                    backgroundColor:'white',
                },
                headerStyle:{
                    elevation: 0,
                    shadowColor: 'transparent'
                }
            }}
        >
            <Stack.Screen 
                name="ProductListScreen" 
                component={ ProductListScreen } 
                options={{ title: 'Productos' }}    
            ></Stack.Screen>

            <Stack.Screen name="ProductScreen" component={ ProductScreen }></Stack.Screen>
        </Stack.Navigator>
    )
}

export default ProductsNavigator
