import React, { useState } from "react";
import { ImageBackground, Image, StyleSheet, View, Text, TouchableOpacity, Linking, Modal } from 'react-native';
import { Menu } from "../Components/Menu";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SpeedTestModal } from "../Modules/SpeedTest/SpeedTestModal";

const baseUrl = 'http://95.164.19.127:5000/';

export const SpeedTest = () =>{
    const open=()=>{
        let url = 'https://www.speedtest.net/';
        Linking.openURL(url) 
    }
    const [state, setstate] = useState([]);
    const [modal, setModal] = useState(false);
    var parsedValue
    
    const GetInfo = async () =>{
        console.log(config);
        const value = await (AsyncStorage.getItem('@storage_token'));
        parsedValue = JSON.parse(value);
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
            setstate(res.data.billingData.services);
            setModal(!modal)
        })
        .catch(function (error) {
            console.log('Токен нот провайдет ',error);
        })
    }

    return(
        <ImageBackground style={styles.container} source={require('../UI/Img/BackGround.png')}>
            <Image style={styles.logo} source={require('../UI/Img/logo.png')}/>
            <View style={styles.view}>
                <Modal
                animationType="fade" 
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>
                    <TouchableOpacity onPress={()=> {setModal(!modal)}} style={styles.modalClose}></TouchableOpacity>
                    <SpeedTestModal setstate={setstate} state={state}/>
                </Modal>
                <Text style={{fontSize: 20, 
                    fontWeight: '400', 
                    marginLeft: 'auto', 
                    marginRight: 'auto', 
                    marginTop: 7, 
                    color: 'white',}}>
                    Помощь
                </Text>
                <Text style={styles.text}>Проверка скорости интернет-соединения</Text>

                <LinearGradient style={styles.button} colors={['rgba(17, 2, 191, 1)', 'rgba(3, 39, 92, 0.73)']}>
                    <TouchableOpacity onPress={() => {open()}} style={styles.buttonTouch}>
                        <Text style={{color: 'white',marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto',}}>SpeedTest.net</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <LinearGradient style={[styles.button, {marginTop: 50}]} colors={['rgba(240, 82, 82, 1)', 'rgba(187, 55, 55, 0.8)']}>
                    <TouchableOpacity onPress={() => {{GetInfo()}}} style={styles.buttonTouch}>
                        <Text style={{color: 'white',marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto',}}>Диагностика неполадок</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <Menu/>
        </ImageBackground>
    )
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
    view:{
        height: '65%',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '15%',
        borderRadius: 15,
        backgroundColor: 'rgba(138, 184, 93, 0.53)',
    },
    text:{
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 62,
        width: '55%',
    },
    button:{
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 185,
        height: 55,
        borderRadius: 15,
    },
    buttonTouch:{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 185,
        height: 35,
        borderRadius: 15,
    },
    modalClose:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.3,
        position: 'absolute',
    }
})