import React, { useState } from "react";
import { ImageBackground, Image, StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native'
import { Menu } from "../Components/Menu";

export const Questions = () =>{
    const [state, setstate] = useState(false);

    const open=()=>{
        let url = 'https://www.business.ru/images/articles/2254/1.jpg';
        Linking.openURL(url) 
    }

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
                    Ответы на вопросы
                </Text>
                <View style={{marginTop: 10,marginLeft: 'auto', marginRight: 'auto', width: '90%',}}>
                    <View style={{backgroundColor: 'black', borderRadius: 15, backgroundColor: 'rgba(138, 184, 93, 1)',}}>
                        <TouchableOpacity onPress={()=>{setstate(!state)}}
                        style={styles.button}>
                            <Text style={styles.text}>Как поставить услугу на паузу</Text>
                        </TouchableOpacity>
                        
                        {state? (<View style={styles.dropDown}>
                            <TouchableOpacity onPress={()=>{open()}}>
                                <Text 
                                style={{color: 'white', marginLeft: '5%', fontSize: 14, fontWeight: '600'}}>
                                    Вы можете увидеть эту информацию в нашем устав  
                                </Text>
                            </TouchableOpacity>
                        </View>) : (<View></View>) }
                    </View>
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
        fontWeight: '500',
        marginTop: 'auto', 
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    button: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        padding: 20,
        borderRadius: 15,
    },
    dropDown:{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        padding: 20,
    }
})