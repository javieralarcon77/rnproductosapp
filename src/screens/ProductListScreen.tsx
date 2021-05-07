import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl, Image } from 'react-native';
import { ProductsContext } from '../context/ProductsContext'
import { Producto } from '../interfaces/appInterfaces';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigate/ProductsNavigator';
import { AuthContext } from '../context/AuthContext';
import Fab from '../components/Fab';

interface Props extends StackScreenProps<ProductsStackParams,'ProductListScreen'>{

}


const ProductListScreen = ({ navigation }:Props) => {

    const {  logOut } = useContext(AuthContext);
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
                           logOut(); 
                        }
                    }
                >
                    <Text>Salir</Text>
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
                <View style={{ flex:1, flexDirection:'row' }}>

                    <Image
                        source={{
                            uri:  producto.img || 'https://via.placeholder.com/200x200.png',
                        }}
                        style={{  
                            height: 50,
                            width: 50,
                            marginRight: 5,
                            borderRadius: 10,
                        }}
                    />
                
                    <View>
                        <Text style={ styles.productName }> { producto.nombre } </Text>
                        <Text style={ styles.productCategory }> { producto.categoria.nombre } </Text>
                    </View>
                    
                </View>
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
            <Fab
                title="+"
                onPress={ ()=>{
                    navigation.navigate('ProductScreen',{})
                } }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    productName:{
        fontSize: 20,
    },
    productCategory:{
        fontSize: 14,
    },
    itemSeparator:{
        borderBottomWidth: 2,
        borderBottomColor: "rgba(0,0,0,0.2)",
        marginVertical: 5,
    }
});

export default ProductListScreen
