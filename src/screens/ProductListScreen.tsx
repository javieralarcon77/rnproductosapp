import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ProductsContext } from '../context/ProductsContext'
import { Producto } from '../interfaces/appInterfaces';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigate/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams,'ProductListScreen'>{

}


const ProductListScreen = ({ navigation }:Props) => {

    const { products, loadProducts } =  useContext(ProductsContext);

    //TODO: Pull to refresh

    useEffect(()=>{

        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity 
                    activeOpacity={ 0.8 }
                    style={{ marginRight: 10 }}
                    onPress={ 
                        ()=>{ 
                            navigation.navigate('ProductScreen',{})
                        }
                    }
                >
                    <Text>Agregar</Text>
                </TouchableOpacity>
            )
        })

    },[]);

    
    const _renderItem = (producto:Producto) => {
        return (
            <TouchableOpacity 
                activeOpacity={ 0.8 }
                onPress={ 
                    ()=>{ 
                        navigation.navigate('ProductScreen',{
                            id: producto._id,
                            name: producto.nombre
                        })
                    }
                }
            >
                <Text style={ styles.productName }> { producto.nombre } </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            <FlatList
                data={ products }
                keyExtractor={ (item)=> item._id }
                renderItem={ ({ item }) => _renderItem( item ) }
                ItemSeparatorComponent={()=> <View style={ styles.itemSeparator }/> }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    productName:{
        fontSize: 20,
    },
    itemSeparator:{
        borderBottomWidth: 2,
        borderBottomColor: "rgba(0,0,0,0.2)",
        marginVertical: 5,
    }
});

export default ProductListScreen
