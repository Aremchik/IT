import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Linking } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://95.164.19.127:5000/';

export const PaymentModal = () => {;
    const [sum, setsumText] = useState(null);
    const [urlText, seturlText] = useState(null);
    const [url, seturl] = useState(['']);
    const [loading, setloading] = useState(false);
    var parsedValue
    const open = async () => {
        Linking.openURL(url)
        
    }
    const handleClear = () =>  {
        setsumText(null)
    }

    const get_axios = async () =>{
        setloading(true)
        const value = await (AsyncStorage.getItem('@storage_token'));
        parsedValue = JSON.parse(value);
        const config = { 
            params:{     
                client_id: parsedValue,
                sum,
            }     
        };
        console.log(config);
        await axios.get(`${baseUrl}/api/create_qr`, config)             
        .then(res => {
            setloading(false)
            seturlText('Нажмите на ссылку что бы перейти в банковское приложение и оплатить сумму через систему быстрых платежей')
            seturl(res.data.response.qr_url);
        })
        .catch(function (error) {
            console.log('ошибка ',error);
        })
    }
    const Button_url = () =>{
        if ( sum ) {
            get_axios()
        }
    }
    
    return(
            <View style={styles.container}>
                <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 15, color: 'white', fontSize: 20, fontWeight: '400',}}>Оплата</Text>
                <TextInput value={sum} onChangeText={setsumText}  style={styles.input} placeholderTextColor={'white'} placeholder={"Введите сумму..."} />
                {loading?(
                    <View>
                        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 15, color: 'white', fontSize: 16, fontWeight: '400',
                        marginLeft: '10%',marginRight:'10%',}}>{urlText}</Text>
                        <TouchableOpacity style={{width: "50%", height: '8%', borderRadius: 15, marginLeft: 'auto', marginRight: 'auto', marginTop: '10%', backgroundColor: 'green',}} onPress={()=>{open()}} >
                            <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 15, color: 'white', fontSize: 16, fontWeight: '400',
                        marginLeft: '10%',marginRight:'10%',}}>Перейти к оплате</Text>
                        </TouchableOpacity>
                    </View>): (
                    <View></View>
                )}
                
                <ActivityIndicator style={styles.indicator} size="large" animating={loading} color="#00ff00" />
                <TouchableOpacity onPress={()=>{{Button_url()}{handleClear()}}} style={styles.button}>
                    <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto',marginBottom: 'auto', color: 'white', fontSize: 20, fontWeight: '400',}}>
                        Оплатить
                    </Text>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '89%',
        opacity: 0.9,
        backgroundColor: 'black',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    input:{
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 15,
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '25%',
        borderColor: 'white',
    },
    button:{
        width: '50%', 
        backgroundColor: 'rgba(138, 184, 93, 1)',
        height: 50,
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    indicator:{
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
})