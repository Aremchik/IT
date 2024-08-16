import React, { useState, useEffect } from "react";
import { ImageBackground, Image, StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native'
import { Menu } from "../Components/Menu";
import { PaymentModal } from "../Modules/Payment/PaymentModal";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = 'http://95.164.19.127:5000/';


export const Payment = () =>{
    const [modal, setModal] = useState(false);

    const [balance, setbalance] = useState(null);
    
    var parsedValue
    
    const load = async() =>{
        try {
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
                        setbalance(res.data.billingData.common_balance);
                    })
                    .catch(function (error) {
                        console.log('ООООшибкаАААААА ',error);
                    }
                )
            }
        }      
        } catch (error) {
            
        }
    }
    useEffect(() => {
        load()
    });

    return(
        <ImageBackground style={styles.container} source={require('../UI/Img/BackGround.png')}>
            <Modal
            animationType="fade" 
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}>
                
                <PaymentModal/>
                <TouchableOpacity onPress={()=> {setModal(!modal);}} style={styles.modalClose}></TouchableOpacity>
            </Modal>
            <Image style={styles.logo} source={require('../UI/Img/logo.png')}/>
            <View style={styles.view}>
                <Text style={{fontSize: 20, 
                    fontWeight: '400', 
                    marginLeft: 'auto', 
                    marginRight: 'auto', 
                    marginTop: 7, 
                    color: 'white',}}>
                    Оплата
                </Text>
                <Text style={styles.text}>Ваш баланс:</Text>
                <Text style={styles.textBalance}>{balance} руб.</Text>
                <View style={styles.paumentView}>
                    <TouchableOpacity style={styles.ButtonSBP} onPress={() => {setModal(!modal)}}><Image style={styles.imgSBP} source={require('../UI/Img/sbpforpay.png')}/></TouchableOpacity>
                    <Text style={styles.textPay}>Оплатить через СБП</Text>
                </View>
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
        width: 'auto',
    },
    textBalance:{
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        width: 'auto',
    },
    imgSBP:{
        width: 62,
        height: 42,
        marginTop: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 'auto',
    },
    paumentView:{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 162,
        flexDirection: 'row',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 80,
    },
    textPay:{
        color: 'white',
        fontSize: 16,
        width: 90,
    },
    ButtonSBP:{
        width: 67,
        height: 52,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    modalClose:{
        width: '100%',
        height: '10%',
    }
})