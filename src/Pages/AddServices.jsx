import React, { useState } from "react";
import { ImageBackground, Image, StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Modal, TextInput, Alert, ActivityIndicator } from 'react-native'
import { Menu } from "../Components/Menu";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";


const baseUrl = 'http://95.164.19.127:5000/';

export const AddServices = () =>{
    const navigation = useNavigation();
    const [message, setmessage] = useState('');
    const [text, settext] = useState('');
    const [modal, setModal] = useState(false);
    const [lead_id, setlead_id] = useState(null);
    const [loading, setload] = useState(false);
    const [nameState, setnameState] = useState('');
    const handleClear = () =>  {
        setmessage('')
        settext('')
    }
    const config = {
            address_id: 1,
            phone: message,
            message: text+' '+nameState,
    };
    const AddServices = () => {
        setload(true)
        if (message && text){
            console.log(config);
            axios.post(`${baseUrl}/api/add_lead`, config)       
            .then(res => {
                setlead_id(res.data.responce.lead_id);
                setload(false)

                Alert.alert(
                    'Ваша заявка успешно зарегистрирована.',
                    `Номер заявки: ${res.data.responce.lead_id}`,
                );
            })
            .catch(function (error) {
                console.log('ООООшибкаАААААА ', error.response.data);
            })
        }else{
            console.log('Пусто');
        }
    }
    return(
        <ImageBackground style={styles.container} source={require('../UI/Img/BackGround.png')}>
            <Image style={styles.logo} source={require('../UI/Img/logo.png')}/>
            <Modal 
            animationType="fade" 
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}>
                
                <SafeAreaView style={{width: '100%', height: '90%', backgroundColor: 'black',
                opacity: 0.9, borderTopEndRadius: 15, borderTopLeftRadius: 15,}}>
                <View style={{width: '100%', height: '70%', borderRadius: 15, 
                marginTop: 'auto', marginBottom: 'auto'}}>
                    <Text style={{fontSize: 16, color: 'white', marginLeft: 'auto', marginRight: 'auto', marginTop: '5%'}}>Введите данные для связи оператора с вами</Text>
                    <TextInput value={message} onChangeText={setmessage} style={[styles.input, {marginTop: '15%',}]} placeholder={'Номер телефона...'} placeholderTextColor={'white'}/>
                    <TextInput value={text} onChangeText={settext} style={[styles.input, {marginTop: '5%',}]} placeholder={'Услуга...'} placeholderTextColor={'white'}/>

                </View>
                <ActivityIndicator style={styles.indicator} size="large" animating={loading} color="#00ff00"/>
                <TouchableOpacity onPress={() => {{AddServices()}{handleClear()}}} style={{marginTop: 'auto', marginBottom: '5%', width: '40%', 
                    height: 50, backgroundColor: 'rgba(0, 86, 0, 1)', borderRadius: 15, marginRight: 'auto', marginLeft: 'auto'}}>
                        <Text style={{marginTop: 'auto',marginRight: 'auto',marginBottom: 'auto',marginLeft: 'auto', color: 'white', fontSize: 16}}>
                            Отправить
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
                <TouchableOpacity onPress={()=> {setModal(!modal)}} style={styles.modalClose}></TouchableOpacity>
            </Modal>
            <View style={styles.view}>

                <View style={styles.swith}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('InServices')}
                    style={{
                        width: 117,
                        height: 32,
                        borderRadius: 15,
                        }}>
                            <Text style={{marginLeft: 'auto',marginRight: 'auto', marginTop: 'auto', marginBottom: 8, color: 'white'}}>Вкл.услуги</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: 117,height: 32,borderRadius: 15, backgroundColor: 'white',}}>
                        <Text style={{marginLeft: 'auto',marginRight: 'auto', marginTop: 'auto', marginBottom: 8, color: 'black'}}>Подкл.услуги</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewButtonTxt}>
                    <View style={styles.ViewAll}>
                        <Text style={styles.text}>Интернет</Text>
                        <TouchableOpacity onPress={()=>{{setModal(!modal)}{setnameState('Интернет')}}} style={styles.button}><Text style={styles.textButton}>Подключить</Text></TouchableOpacity>
                    </View>
                    <View style={styles.ViewAll}>
                        <Text style={styles.text}>Телевидение</Text>
                        <TouchableOpacity onPress={()=>{{setModal(!modal)}{setnameState('Телевидение')}}} style={styles.button}><Text style={styles.textButton}>Подключить</Text></TouchableOpacity>
                    </View>
                    <View style={styles.ViewAll}>
                        <Text style={styles.text}>Телефония</Text>
                        <TouchableOpacity onPress={()=>{{setModal(!modal)}{setnameState('Телефония')}}} style={styles.button}><Text style={styles.textButton}>Подключить</Text></TouchableOpacity>
                    </View>
                    <View style={styles.ViewAll}>
                        <Text style={styles.text}>Видеонаблюдение</Text>
                        <TouchableOpacity onPress={()=>{{setModal(!modal)}{setnameState('Видеонаблюдение')}}} style={styles.button}><Text style={styles.textButton}>Подключить</Text></TouchableOpacity>
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
    swith:{
        borderRadius: 15,
        borderWidth: 1,
        width: 234,
        height: 32,
        borderColor: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row',

    },
    swithButton:{
        width: 117,
        height: 32,
        borderRadius: 15,
    },
    viewButtonTxt:{
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
    },
    ViewAll:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 39,
    },
    text:{
        color: 'white',
        marginRight: 'auto',
        fontSize: 14,
        fontWeight: '400',
        marginTop: 4,
    },

    button:{
        width: 127,
        height: 32,
        backgroundColor: 'rgba(0, 86, 0, 1)',
        borderRadius: 15,
        marginLeft: 'auto',
    },
    textButton:{
        color: 'white',
        marginLeft: 'auto',
        marginRight: 'auto',
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
        marginTop: '5%',
        borderColor: 'white',
    },
    modalClose:{
        width: '100%',
        height: '10%',
        marginTop: 'auto',
    },
    indicator:{
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
})