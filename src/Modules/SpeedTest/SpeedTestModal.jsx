import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Modal } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://95.164.19.127:5000/';

export const SpeedTestModal = ({state}) =>{

    var parsedValue    
    var noid
    const [messageNoid, setmessageNoid] = useState('');
    const [noidModal, setnoidModal] = useState(false);
    const [loading, setloading] = useState(true);
    const [alertFalse, setalertFalse] = useState(true);
    const GetInfoNoid = async (noid_id) =>{
        var value = await (AsyncStorage.getItem('@storage_token'));
        parsedValue = JSON.parse(value);
        noid = noid_id
        try {
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    client_id: parsedValue,
                    noid: `${noid}`,
                }
            };
            console.log(config);

            axios.get(`${baseUrl}/api/get_snp_info`, config)
                    
            .then(res => {
                const stateStatus = res.data.alert
                console.log(stateStatus);
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
                const stateStatus = res.data.alert
                console.log(stateStatus);
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
                    console.log('что-то пошло не так');
                    setmessageNoid('что-то пошло не так');
                    console.log(messageNoid);
                    setloading(false);
                    setalertFalse(false)
                })
            })
        } catch (error) {
            console.log('Не работает');
        }
       
    }


    return(
        <View style={{width: '80%', height: '80%', backgroundColor: '#0D7000', borderRadius: 15, 
                    marginTop: 'auto',
                    marginLeft: 'auto',
                    marginRight: 'auto', 
                    marginBottom: '25%',}}>
            <Text style={{color: 'white', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', fontSize: 18}}>Проверить сервис:</Text>
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
                <View  style={styles.ScrollView}>
                    <ScrollView>
                        <View >
                        {state.map((state, index) => {
                            return(
                                <View key={index}>
                                    <TouchableOpacity key={state.servicetype} onPress={()=> {{GetInfoNoid(state.noid)}{setnoidModal(!noidModal)}}} 
                                    style={{width: '100%',marginTop: 15, marginBottom: 20, borderColor: 'black', borderWidth: 1, borderRadius: 15, height: 'auto', backgroundColor:'rgba(138, 184, 93, 1)'}}>
                                        <Text key={state.someProperty} style={{color: 'white', width: '80%', 
                                        marginLeft: 'auto', marginTop: '2%',marginRight: 'auto', marginBottom: 'auto', 
                                        fontSize: 20}}>
                                            Сервис: {state.servicetype}
                                        </Text>
                                        <Text key={state.someProperty} style={{color: 'white', width: '80%', 
                                        marginLeft: 'auto', marginTop: '2%',marginRight: 'auto', marginBottom: '2%', 
                                        fontSize: 20}}>
                                            Адрес: {state.address}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                )
                            }
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    ScrollView:{
        width: '100%',
        height: '89.5%',
        marginBottom: 10,
        marginRight: 58,
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