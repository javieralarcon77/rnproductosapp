import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { ProductsContext } from '../context/ProductsContext'
import { Producto } from '../interfaces/appInterfaces';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigate/ProductsNavigator';

interface Props extends StackScreenProps<ProductsStackParams,'ProductListScreen'>{

}


const ProductListScreen = ({ navigation }:Props) => {

    const { products, loadProducts } =  useContext(ProductsContext);
    const [refresing, setRefresing] = useState(false);

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

    const loadProductosFromBackend = async () => {
        setRefresing(true);
        await loadProducts();
        setRefresing(false);
    }

    return (
        <View style={{ flex: 1, marginHorizontal: 10 }}>
            <FlatList
                data={ products }
                keyExtractor={ (item)=> item._id }
                renderItem={ ({ item }) => _renderItem( item ) }
                ItemSeparatorComponent={()=> <View style={ styles.itemSeparator }/> }
                refreshControl={ 
                    <RefreshControl
                        refreshing={ refresing }
                        onRefresh={ loadProductosFromBackend }
                        progressViewOffset={ 10 }
                        progressBackgroundColor="#5856D6"
                        style={ { marginTop: 10 } }
                    />
                }
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
