import React from "react";
import { ImageBackground, Image, StyleSheet, View, Text } from 'react-native'
import { Menu } from "../Components/Menu";

export const Message = () =>{
    
    return(
        <ImageBackground style={styles.container} source={require('../UI/Img/BackGround.png')}>
            <Image style={styles.logo} source={require('../UI/Img/logo.png')}/>
            <View style={styles.view}>
                <Text style={{fontSize: 20, 
                    fontWeight: '400', 
                    marginLeft: 'auto', 
                    marginRight: 'auto', 
                    marginTop: 7, 
                    color: 'white',}}>
                    Сообщения
                </Text>
                <View style={{marginTop: 10}}>
                    <Text style={styles.text}>Сейчас : Авария на узле связи</Text>
                    <Text style={styles.text}>25.04.2023 : Прерывания связи</Text>
                    <Text style={styles.text}>01.05.2023 : Новая акция</Text>
                    <Text style={styles.text}>04.07.2023 : Запуск нового поселка </Text>
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
        marginTop: 49,
        width: '55%',
    }
})