import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Menu } from "../Components/Menu";
import Swiper from 'react-native-swiper'
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const baseUrl = 'http://95.164.19.127:5000/';

const slide = [
    { id: 1, text: 'Реклама 1', imageUri: require('../UI/Img/slider1.png') },
    { id: 2, text: 'Реклама 2', imageUri: require('../UI/Img/slider1.png') },
    { id: 3, text: 'Реклама 3', imageUri: require('../UI/Img/slider1.png') },
  ];



export const MainPages = () =>{
    const navigation = useNavigation();
    const [names, setnames] = useState([true]);
    const [balance, setbalance] = useState(null);
    const [bonus, setbonus] = useState([]);
    const [loading, setloading] = useState(true);
    var parsedValue
    
    const load = async () =>{
        try{
            const value = await (AsyncStorage.getItem('@storage_token'));
            parsedValue = JSON.parse(value);
            if (value !== null) {
                if (balance === null){
                    const config = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: {
                            token: parsedValue,
                        },
                    };
                    await axios.get(`${baseUrl}/api/auth`, config)
            
                    .then(res => {
                        setloading(false)
                        setnames(res.data.billingData.client_name);
                        setbalance(res.data.billingData.common_balance);
                        setbonus(res.data.billingData.bonus);
                        
                    })
                    .catch(function (error) {
                        console.log('ООООшибкаАААААА ',error);
                    })
            }
        }
        }catch (error) {
            console.log('Ошибка при получении значения из AsyncStorage', error);
        }
        finally {
        }
    }

    useEffect(() => {
        load()
    });
    
    
    
    
    return(
        <ImageBackground style={styles.container} source={require('../UI/Img/BackGround.png')}>
            
            <Image style={styles.logo} source={require('../UI/Img/logo.png')}/>
            <Text style={styles.textName}>{names}</Text>
            <ActivityIndicator style={styles.indicator} size="large" animating={loading} color="#00ff00" />
            <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={styles.money}><Text style={styles.moneyText}>{balance} руб.</Text></TouchableOpacity>
            <Text style={styles.bonuses}>Бонусы: {bonus} руб.</Text>
            <Swiper showsButtons={false}>
                {slide.map((slide) => (
                    <View style={styles.slide} key={slide.id}>
                        <Image style={styles.image} source={slide.imageUri} />
                    </View>
                ))}
            </Swiper>
            <Menu/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#0D7000',
    },
    logo:{
        width: 34,
        height: 45,
        marginTop: 50,
        marginLeft: 24,
    },
    textName: {
        color: 'white',
        fontSize: 26,
        fontWeight: '400',
        marginLeft: 20,
        marginTop: 67,
    },
    money:{
        width: 174,
        height: 49,
        backgroundColor: 'rgba(138, 184, 93, 0.65)',
        borderRadius: 25,
        marginLeft: 22,
        marginTop: 27,
    },
    moneyText:{
        color: 'red',
        fontSize: 20,
        fontWeight: '400',
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    nomber:{
        marginLeft: 22,
        marginTop: 30,
        color: 'white',
        fontSize: 16,
    },
    bonuses:{
        marginLeft: 22,
        marginTop: 72,
        color: 'white',
        fontSize: 16,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#9DD6EB',
    },
    image: {
        width: '100%',
        height: '45%',
        resizeMode: 'stretch',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    indicator:{
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
  