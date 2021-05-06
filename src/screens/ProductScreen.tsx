import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigate/ProductsNavigator';
import { ScrollView } from 'react-native-gesture-handler';

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
        <View style={ styles.container }>
            {/* 
                <Text style={ styles.text }>Producto: { name }</Text>
                <Text style={ styles.text }>Id: { id }</Text> 
            */}
            <ScrollView>
                <Text style={ styles.label }>Nombre del producto</Text>
                <TextInput
                    placeholder="Producto"
                    style={ styles.input }

                    //TODO:
                    //value
                    //onChangeText
                />

                {/** Picker / Selector */}
                <Text style={ styles.label }>Categoría</Text>
                

                <Button
                    title="Guardar"
                    onPress={ ()=>{} } //TODO: agregar funcionalidad
                    color="#5856D6"
                />

                {/** Botones para agregar la imagen al guardar el producto */}
                <View style={ styles.containerButtons } >
                    <Button
                        title="Cámara"
                        onPress={ ()=>{} } //TODO: agregar funcionalidad
                        color="#5856D6"
                    />
                    <View style={{ width: 10 }}/>
                    <Button
                        title="Galería"
                        onPress={ ()=>{} } //TODO: agregar funcionalidad
                        color="#5856D6"
                    />  
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 10,
        marginHorizontal: 20,
    },
    label:{
        fontSize: 18,
        marginVertical: 5,
    },
    input:{
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderColor:"rgba(0,0,0,0.2)",
        height: 45,
        marginBottom: 10,
    },
    containerButtons:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop: 10,
    }
});

export default ProductScreen
