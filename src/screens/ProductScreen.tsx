import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Image, ScrollView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';

import { launchCamera, launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

import { ProductsStackParams } from '../navigate/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams,'ProductScreen'>{

}

const ProductScreen = ({ route, navigation }:Props) => {
    const { id = '', name = '' } = route.params;

    const [tempUri, setTempUri] = useState<string>();
    const { categories } = useCategories();

    const { 
        loadProductById,
        addProduct,
        updateProduct,
        uploadImage
     } = useContext( ProductsContext );
    
    const { _id, nombre, categoriaId, img, form, onChange, setFormValue } = useForm({
        _id: id,
        categoriaId: '',
        nombre: name,
        img: ''
    });

    useEffect(()=>{
        navigation.setOptions({
            title: (nombre !== '') ? nombre : 'Nuevo Producto'
        })
    },[ nombre ])

    useEffect(() => {
        loadProduct();
    }, [])

    useEffect(() => {
        if(categories.length > 0 && _id.length === 0){
            onChange( categories[0]._id, 'categoriaId' );
        }
    }, [ categories ])

    const loadProduct = async () => {
        if(_id.length === 0) return;
        const product = await loadProductById( _id );
        
        setFormValue({
            ...form,
            categoriaId: product.categoria._id,
            img: (product.img) ? product.img : '',
        })
    }

    const saveOrUpdate = async () => {
        if( _id.length > 0 ){ //actualizar
            updateProduct( categoriaId, nombre, _id );
        }else{ //guardar
            const product = await addProduct( categoriaId, nombre );
            if(product._id){
                onChange(product._id, '_id');
            }
        }
    }

    const respPhoto = (resp:ImagePickerResponse) => {
        if(resp.didCancel) return;            
        if(!resp.uri) return;

        setTempUri( resp.uri );
        uploadImage( resp, _id );
    }

    const takePhoto = async () => {
        launchCamera({
            mediaType:'photo',
            quality: 0.5
        }, respPhoto )
    }

    const takePhotoFromGalery = async () => {
        launchImageLibrary({
            mediaType:'photo',
            quality: 0.5
        }, respPhoto )
    } 

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

                    value={ nombre }
                    onChangeText={ (value) => onChange( value, 'nombre' ) }
                />

                {/** Picker / Selector */}
                <Text style={ styles.label }>Categoría</Text>
                <View style={ {
                    ...styles.input,
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    marginBottom: 10,
                } }>
                    <Picker
                        style={{ top: -5 }}
                        selectedValue={ categoriaId }
                        onValueChange={( value ) => onChange(value, 'categoriaId') }
                    >
                        {
                            categories.map( (c) => (
                                <Picker.Item 
                                    label={ c.nombre } 
                                    value={ c._id }
                                    key={ c._id }
                                />
                            ) )    
                        }
                    </Picker>
                </View>
                
                <Button
                    title="Guardar"
                    onPress={ saveOrUpdate } //TODO: agregar funcionalidad
                    color="#5856D6"
                />

                {/** Botones para agregar la imagen al guardar el producto */}
                {
                    _id.length > 0 && 
                    <View style={ styles.containerButtons } >
                        <Button
                            title="Cámara"
                            onPress={ takePhoto } //TODO: agregar funcionalidad
                            color="#5856D6"
                        />
                        <View style={{ width: 10 }}/>
                        <Button
                            title="Galería"
                            onPress={ takePhotoFromGalery } //TODO: agregar funcionalidad
                            color="#5856D6"
                        />  
                    </View>
                }
                {
                    (img.length > 0 && !tempUri ) &&
                    <Image
                        source={{
                            uri: img 
                        }}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            height: 300
                        }}
                    />
                }
                {
                    tempUri &&
                    <Image
                        source={{
                            uri: tempUri 
                        }}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            height: 300
                        }}
                    />
                }

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
        color:'#000000',
        marginBottom: 10,
    },
    containerButtons:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop: 10,
    }
});

export default ProductScreen
