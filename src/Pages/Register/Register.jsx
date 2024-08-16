import React, { useState } from "react";
import { ImageBackground, Image, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://95.164.19.127:5000/';

export const Register = () =>{
    const navigation = useNavigation();
    const [login, setlogin] = useState('');
    const [password, setpassword] = useState('');
    const nextPages = () =>{
        if ( login && password ) {
            console.log(login);
            console.log(password);
            axios.post(`${baseUrl}/api/auth`, { login, password } )
                .then(res => {
                    try {
                        const jsonValue = JSON.stringify(res.data.token)
                        AsyncStorage.setItem('@storage_token', jsonValue)
                    } catch (e) {
                        console.log('Ошибка в сохранении токена', error);
                    }
                    navigation.navigate('MainPages')
                })
                .catch(function (error) {
                    console.log('Ошибка ',error);
                })
        }else{
            console.log('dont text in input');
        }

    }
    return(
        <ImageBackground style={styles.container} source={require('../../UI/Img/BackGround.png')}>
            <Image style={styles.logo} source={require('../../UI/Img/logo.png')}/>
            <TextInput value={login} onChangeText={setlogin} style={[styles.input, {marginTop: '15%',}]} placeholder={'Почта...'} placeholderTextColor={'white'}/>
            <TextInput value={password} onChangeText={setpassword} style={styles.input} placeholder={'Пароль...'} placeholderTextColor={'white'} secureTextEntry={true}/>
            <TouchableOpacity onPress={()=> {navigation.navigate('RegisteContract')}} style={{marginLeft: 'auto', marginRight: 'auto', color: 'white', marginTop: 10,}}><Text style={ {color: 'white'}}>Войти по номеру договора</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => {{nextPages()}}} style={styles.button}><Text style={styles.text}>Войти</Text></TouchableOpacity>
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
        width: 54,
        height: 73,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50%',
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
        marginTop: '5%',
        borderColor: 'white',
    },
    button:{
        backgroundColor: 'rgba(138, 184, 93, 0.65)',
        width: 150,
        height: 50,
        borderRadius: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100,
        marginBottom: 100,
    },
    text:{ 
        marginLeft: 'auto', 
        marginRight: 'auto', 
        color: 'white', 
        marginTop: 'auto', 
        marginBottom: 'auto', 
        color: 'white',
    }
})