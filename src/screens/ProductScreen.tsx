import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigate/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams,'ProductScreen'>{

}

const ProductScreen = ({ route, navigation }:Props) => {
    const { id, name = '' } = route.params;

    useEffect(()=>{
        navigation.setOptions({
            title: (name !== '') ? name : 'Nuevo Producto'
        })
    },[])

    return (
        <View>
            <Text style={ styles.text }>Producto: { name }</Text>
            <Text style={ styles.text }>Id: { id }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        fontSize: 20,
        marginVertical: 5,
    }
});

export default ProductScreen
