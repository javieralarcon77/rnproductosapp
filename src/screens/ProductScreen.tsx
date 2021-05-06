import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigate/ProductsNavigator';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductsContext } from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams,'ProductScreen'>{

}

const ProductScreen = ({ route, navigation }:Props) => {
    const { id = '', name = '' } = route.params;

    const { categories } = useCategories();

    const { 
        loadProductById,
        addProduct,
        updateProduct,
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
                <Picker
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
                }
                
                {
                    img.length > 0 &&
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
