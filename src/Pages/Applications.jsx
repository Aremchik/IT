import React, { useState, useEffect } from "react";
import { ImageBackground, Image, StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Alert } from 'react-native'
import { Menu } from "../Components/Menu";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chat } from "./Chat";


const baseUrl = 'http://95.164.19.127:5000/';

export const Applications = props =>{
    const [modal, setModal] = useState(false);
    const [messageInput, setmessageInput] = useState('');

    const [modalMessage, setmodalMessage] = useState(false);


    const [value, setvalue] = useState([]);
    
    const [object, setObject] = useState(null);
    const [message, setmessage] = useState([]);
    const [propschat, setpropschat] = useState('');
    var alert
    var parsedValue

    const now = new Date();
    now.setDate(now.getDate() + 1)
    const json = JSON.stringify(now);
    const rExp = /T|.{5}$/g;
    const date = json.replace(rExp, ' ').trim();

    

    const tokenParse = async () =>{
        const token = await (AsyncStorage.getItem('@storage_token'));
        setvalue(JSON.parse(token))
    }
    
    const configData = {
        client_id: value,
        name: messageInput,
        end_date: typeof date === 'string' ? date.replace(/['".]+/g, '') : '',
        notes: 'TEST_APP',
        history_comment: messageInput,
        department: 1,
    }


    const Postmessage = () => {
        
        axios.post(`${baseUrl}/api/add_task`, configData)  
        .then(res => {
            setObject(null)
            LoadData()
            LoadData()
            alert = res.data.responce[1]
            console.log(alert);
            Alert.alert(
                'Ваша заявка успешна создана под номером: '+{alert},
            );
        })
        .catch(function (error) {
            console.log('Сервер ', error);
        })
    }


    const LoadData = async (message) =>{
        try{
            const value = await (AsyncStorage.getItem('@storage_token'));
            parsedValue = JSON.parse(value);
            if (value !== null) {
                if (object === null){
                    const token = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params:{
                            token: parsedValue,
                        }
                        
                    }
                    await axios.get(`${baseUrl}/api/get_comment_on_task`, token) 
                    .then(res => {
                        console.log(res.data.response);
                        setmessage(res.data.response.tasks);
                        setObject(Object.values(message));
                    }).catch(function (error) {
                        console.log('ООООшибкаАААААА ',error);
                    })
                }else{}
            }
        }catch (error) {
            console.log('Ошибка при получении значения из AsyncStorage', error);
           }
        finally {
        }
    }

    useEffect(() => {
        tokenParse();
        LoadData(message)        
    });
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
                <TouchableOpacity onPress={()=> {setModal(!modal);}} style={styles.modalCloseOpen}></TouchableOpacity>
                <View style={{backgroundColor: 'black', width: '100%', height: '89.5%'}}>
                    <Text style={{color: 'white', fontSize: 24, width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: '15%'}}>
                        Опишите проблему, которая у вас появилась:
                    </Text>
                    <TextInput style={{
                        marginTop: 'auto',
                        width: '80%',
                        height: '10%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: 26,
                        borderTopColor: 'rgba(138, 184, 93, 1)',
                        borderBottomColor: 'rgba(138, 184, 93, 1)',
                        borderBottomWidth: 1,
                        borderTopWidth: 1,
                        color: 'white',
                    }}  multiline={true} value={messageInput} onChangeText={setmessageInput} placeholderTextColor={'white'} placeholder={'Введите свою проблему...'}/>
                    <TouchableOpacity
                    onPress={()=>{{setmessageInput('')} {Postmessage()} {showAlert()} {setModal(!modal)}}}
                    style={{width: '50%', 
                        backgroundColor: 'rgba(138, 184, 93, 1)',
                        height: 50, 
                        marginTop: 'auto', 
                        marginBottom: '25%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        borderRadius: 15,
                    }}>
                        <Text style={{color: 'white', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>Далее</Text>
                    </TouchableOpacity>       
                </View>
            </Modal>

            <View style={styles.view}>
                <Text style={{fontSize: 20, 
                    fontWeight: '400', 
                    marginLeft: 'auto', 
                    marginRight: 'auto', 
                    marginTop: 7, 
                    color: 'white',}}>
                    Мои заявки
                </Text>
                <View style={styles.ScrollView}>
                    <ScrollView>
                        <View>
                            {object?.map((object, index) => {
                                return(
                                        <TouchableOpacity key={index} 

                                        onPress={()=>{{setmodalMessage(!modalMessage)}{setpropschat(object.task_id)}}}
                                        
                                        style={{
                                        backgroundColor: 'rgba(138, 184, 93, 1)',
                                        borderRadius: 15,
                                        marginBottom: '2%',
                                        width: '95%',
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        height: 50,}} 
                                        >
                                            <Modal
                                            animationType="fade" 
                                            transparent={true}
                                            visible={modalMessage}
                                            onRequestClose={() => {
                                                setmodalMessage(!modalMessage);
                                            }}>
                                                
                                                <TouchableOpacity onPress={()=> {setmodalMessage(!modalMessage)}} style={styles.modalClose}></TouchableOpacity>
                                                <Chat tasksToken={propschat}/>
                                            </Modal>
                                            <Text key={object.someProperty} style={{color: 'black', marginTop: 'auto', marginLeft: '2%', marginBottom: 'auto'}}>
                                                Заявка №{object.task_id} от {object.create_task_date}
                                            </Text>
                                            
                                        </TouchableOpacity>
                                    )
                                }
                            )}
                            
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={()=>{{setModal(!modal)}}} style={styles.button}>
                    <Text style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '400',
                        }}>
                            Создать заявку
                    </Text>
                </TouchableOpacity>
            </View>
            <Menu/>
        </ImageBackground>
    )
}

/*

*/
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: '#0D7000',
    },
    containermodal:{
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
    button:{
        width: '50%',
        height: 55,
        backgroundColor: 'rgba(0, 86, 0, 1)',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 45,
        borderRadius: 15,
    },
    ScrollView:{
        width: '100%',
        height: '69%',
        marginBottom: 10,
        marginRight: 58,
        position: 'absolute',
        marginTop: '15%',
    },
    modalClose:{
        width: '100%',
        height: '89.5%',
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.7,
    },
    modalCloseOpen:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.8,
    },
})