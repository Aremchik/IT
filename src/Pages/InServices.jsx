import React, { useState, useEffect, useLayoutEffect } from "react";
import { ImageBackground, Image, StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native'
import { Menu } from "../Components/Menu";
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://95.164.19.127:5000/';

export const InServices = () =>{
    const navigation = useNavigation();
    const [state, setstate] = useState(null);
    const [modal, setModal] = useState(false);
    const [noidModal, setnoidModal] = useState(false);
    var noid
    const [messageNoid, setmessageNoid] = useState('');
    const [loading, setloading] = useState(true);
    const [alertFalse, setalertFalse] = useState(true);
    var parsedValue

    

    


    const GetInfoNoid = () =>{
        console.log(config);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            },
            params: {    
                client_id: parsedValue,
                noid: `${noid}`,
            },
        };
        axios.get(`${baseUrl}/api/get_snp_info`, config)
                
        .then(res => {
            console.log(res.data);
            const stateStatus = res.data.alert
            if (Object.keys(stateStatus) == "global_alert"){
                console.log('egnhsridfjkm');
                setmessageNoid('Обнаружена проблема на операторской сети, возможна деградация услуг');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.keys(stateStatus) == "garland_alert"){
                console.log('egnhsridfjkm');
                setmessageNoid('Обнаружена проблема на станции обслуживающей ваш район - специалисты уже занимаются ремонтно-восстановительными работами');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.keys(stateStatus) == "raspred_alert"){
                console.log('egnhsridfjkm');
                setmessageNoid('Обнаружена проблема на оптическом распределении. специалисты уже занимаются ремонтно-восстановительными работами');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.keys(stateStatus) == "noid:"){
                console.log('egnhsridfjkm');
                setmessageNoid('система не обнаружила проблем, Попробуйте перезагрузить оборудование, если это не даст никакого эффекта, просим создать заявку из соответствующего меню приложения');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.keys(stateStatus) == "onu_status"){
                console.log('egnhsridfjkm');
                setmessageNoid('Не видим питания на оптическом преобразователе, просим проверить подключение питания');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.values(stateStatus) == "wire-down"){
                console.log('egnhsridfjkm');
                setmessageNoid('Не видим сигнала от оптического преобразователя, просим проверить подключение желтого провода');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
        })
        .catch(function (error) {
            axios.get(`${baseUrl}/api/get_snp_info`, config)
                
        .then(res => {
            console.log(res.data);
            const stateStatus = res.data.alert
            if (Object.keys(stateStatus) == "global_alert"){
                console.log('egnhsridfjkm');
                setmessageNoid('Обнаружена проблема на операторской сети, возможна деградация услуг');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.keys(stateStatus) == "garland_alert"){
                console.log('egnhsridfjkm');
                setmessageNoid('Обнаружена проблема на станции обслуживающей ваш район - специалисты уже занимаются ремонтно-восстановительными работами');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.keys(stateStatus) == "raspred_alert"){
                console.log('egnhsridfjkm');
                setmessageNoid('Обнаружена проблема на оптическом распределении. специалисты уже занимаются ремонтно-восстановительными работами');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.keys(stateStatus) == "noid:"){
                console.log('egnhsridfjkm');
                setmessageNoid('система не обнаружила проблем, Попробуйте перезагрузить оборудование, если это не даст никакого эффекта, просим создать заявку из соответствующего меню приложения');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.keys(stateStatus) == "onu_status"){
                console.log('egnhsridfjkm');
                setmessageNoid('Не видим питания на оптическом преобразователе, просим проверить подключение питания');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            if (Object.values(stateStatus) == "wire-down"){
                console.log('egnhsridfjkm');
                setmessageNoid('Не видим сигнала от оптического преобразователя, просим проверить подключение желтого провода');
                console.log(messageNoid);
                setloading(false);
                setalertFalse(false)
            }
            })
            .catch(function (error) {
                setmessageNoid('что-то пошло не так');
                setloading(false);
                setalertFalse(false)
            })
        })
    }

    const load = async () =>{
        try {
            const value = await (AsyncStorage.getItem('@storage_token'));
            parsedValue = JSON.parse(value);
            if (value !== null) {
                if (state === null){
                    const DataConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: {
                            token: parsedValue,
                        },
                    };
                    await axios.get(`${baseUrl}/api/auth`, DataConfig)      
                    .then(res => {
                        setstate(res.data.billingData.services);
                    })
                    .catch(function (error) {
                        console.log('ООООшибкаАААААА ',error);
                    })   
                }
            }else{}
        } catch (error) {
            
        }
    }

    useEffect(() => {
        load();
    });

    
   
    return(
        <ImageBackground style={styles.container} source={require('../UI/Img/BackGround.png')}>
            <Image style={styles.logo} source={require('../UI/Img/logo.png')}/>
            <View style={styles.view}>
            <Modal
                animationType="fade" 
                transparent={true}
                visible={noidModal}
                onRequestClose={() => {
                    setnoidModal(!noidModal);
                }}>
                    <TouchableOpacity onPress={()=> {{setnoidModal(!noidModal)}{setmessageNoid('')}{setloading(true)}{setalertFalse(true)}}} style={styles.modalClose}></TouchableOpacity>
                    { alertFalse ? (<ActivityIndicator style={styles.indicator} size="large" animating={loading} color="#00ff00" />):(
                    <View style={{width: '60%', height: '15%', backgroundColor:'rgba(138, 184, 93, 1)', borderRadius: 15, borderWidth: 1, borderColor: 'white',
                    marginTop: 'auto', marginLeft: 'auto', marginRight: 'auto', marginBottom: 'auto'}}>
                        <Text style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto', color: 'white'}}>
                            {messageNoid}
                        </Text>
                    </View>
                    )}
                </Modal>
                <View style={styles.swith}>
                    <TouchableOpacity
                    style={{
                        width: 117,
                        height: 32,
                        borderRadius: 15,
                        backgroundColor: 'white',}}>
                            <Text style={{marginLeft: 'auto',marginRight: 'auto', marginTop: 'auto', marginBottom: 8, color: 'black'}}>
                                Вкл.услуги
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('AddServices')} style={{width: 117,height: 32,borderRadius: 15}}>
                        <Text
                        style={{marginLeft: 'auto',marginRight: 'auto', marginTop: 'auto', marginBottom: 8, color: 'white'}}
                        >Подкл.услуги</Text>
                    </TouchableOpacity>
                </View>
                <View  style={styles.ScrollView}>
                <ScrollView>
                    <View >
                        {state?.map((tarif, index) => {
                            return(
                                <TouchableOpacity onPress={()=> {{noid = tarif.noid}{GetInfoNoid()}{setnoidModal(!noidModal);}}} style={styles.button} key={index}>
                                    <Text key={tarif.someProperty} style={{color: 'white', width: '80%', marginLeft: '10%', marginTop: 15, fontSize: 20}}>Сервис: {tarif.servicetype}</Text>
                                    <Text key={tarif.someProperty} style={{color: 'white', width: '80%', marginLeft: '10%', marginTop: 17}}>Тариф: {tarif.tariff_name}</Text>
                                    <Text key={tarif.someProperty} style={{color: 'white', width: '80%', marginLeft: '10%', marginTop: 17}}>Сумма: {tarif.tariff_summ} руб.</Text>
                                    <Text key={tarif.someProperty} style={{color: 'white', width: '80%', marginLeft: '10%', marginTop: 17, marginBottom: 17}}>Статус: {tarif.status_noid}</Text>
                                </TouchableOpacity>
                                )
                            }
                        )}
                    </View>
                </ScrollView>
                <Modal
                animationType="fade" 
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    setModal(!modal);
                }}>

                </Modal>
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
    ScrollView:{
        width: '100%',
        height: '90%',
        marginBottom: 10,
        marginRight: 58,
    },
    button:{
        backgroundColor: 'background: rgba(0, 86, 0, 1)',
        marginTop: 15,
        borderRadius: 15,
    },
    modalClose:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.3,
        position: 'absolute',
    },
    indicator:{
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
})