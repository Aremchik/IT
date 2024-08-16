import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://95.164.19.127:5000/';

export const Chat = ({tasksToken}) =>{
    const [message, setmessage] = useState(null);
    const [messageInput, setmessageInput] = useState('');

    const styleGreen = {
        backgroundColor: 'rgba(138, 184, 93, 1)',
        borderRadius: 15,
        marginBottom: '2%',
        width: '70%',
        marginLeft: 'auto',
        marginRight: '2%',
    }
    const styleWhite = {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: '2%',
        width: '70%',
        marginRight: 'auto',
        marginLeft: '2%',
    }

    

    //отправка сообщений
    const PostMessageLoad = async () => {
        if (messageInput){
            console.log(data);
            const value = await (AsyncStorage.getItem('@storage_token'));
            const parsedValue = JSON.parse(value);
            const data ={
                headers: {
                    'Content-Type': 'application/json',
                },
                client_id: parsedValue,
                comment: messageInput,
                task_id: tasksToken, 
            }
            await axios.post(`${baseUrl}/api/add_comment `, data)  
            .then(res => {
                console.log(res.data); 
                setmessage(null)
                LoadData()
                LoadData()
                LoadData()
            })
            .catch(function (error) {
                console.log('Сервер не отправил сообщение, причина => ', error);
            })
        }
    }

    //вывод сообщений
    const LoadData = async () =>{
        try{
            const value = await (AsyncStorage.getItem('@storage_token'));
            const parsedValue = JSON.parse(value);
            if (value !== null) {
                
                if (message === null){
                    
                    const data = {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params:{
                            token: parsedValue,
                        }
                        
                    }
                    await axios.get(`${baseUrl}/api/get_comment_on_task`, data)
                
                    .then(res => {      
                        setmessage(res.data.response.tasks[tasksToken].histories);
                    })
                    .catch(function (error) {
                        console.log('ООООшибкаАААААА ', error);
                    })
                }else{
                    console.log('не прошли сообщения на выход');
                }
                
            }
        }catch (error) {
            console.log('Ошибка при получении значения из AsyncStorage', error);
           }
        finally {
        }
    }
    
    useEffect(() => {
        LoadData()
    });


    return(
            <View style={styles.view}>
                <Text style={{fontSize: 20, 
                    fontWeight: '400', 
                    marginLeft: 'auto', 
                    marginRight: 'auto', 
                    marginTop: 7, 
                    color: 'white',}}>
                    Чат с поддержкой
                </Text>
                <Text style={styles.text}>Задайте вопрос ниже и наш специалист ответит на него в ближайшее время:</Text>

                <View style={{width: '100%', height: '75%',
                    backgroundColor: 'white',marginTop: 10,
                    borderRadius: 15,
                    justifyContent: 'space-between',
                    flexDirection: 'row',}}>
                    <View style={styles.message}>
                        <ScrollView>
                            <View>
                            {message?.map((message, index) => {
                                return(
                                    <View key={index} style={message.is_client_message===1?styleGreen:styleWhite}>
                                        <Text key={message.someProperty} style={{color: 'black', marginLeft: '5%', marginTop: 5}}>{message.comment}</Text>
                                        <Text key={message.someProperty} style={{fontSize: 10, color: 'black',marginLeft:'auto', marginBottom: 5, marginRight: '5%'}}>{message.date.slice(1-10)}</Text>
                                    </View>
                                )
                                }
                            )}
                            </View>
                        </ScrollView>
                    </View>
                    <TextInput style={styles.input} multiline={true} value={messageInput} onChangeText={setmessageInput} placeholder={'Введите текст сообщения...'}/>
                                
                    <TouchableOpacity onPress={()=>{{PostMessageLoad()}{setmessageInput('')}}} style={{borderTopColor: 'rgba(138, 184, 93, 1)',backgroundColor: 'white', width: '20%', height: '20%', marginTop: 'auto', borderBottomRightRadius: 15,}}>
                        <Image style={{width: '70%', height: '80%', marginLeft: 'auto',
                            marginRight: 'auto', marginTop: 'auto',
                            marginBottom: 'auto',
                        }} source={require('../UI/Img/go.png')}/>
                    </TouchableOpacity>
                </View>
            </View>

    )
}



/*
<TouchableOpacity onPress={pickDocument} style={{backgroundColor: 'white', width: '20%', height: '20%', marginTop: 'auto', borderBottomRightRadius: 15,}}>
    <Image style={{width: '70%', height: '80%', marginLeft: 'auto',
    marginRight: 'auto', marginTop: 'auto',
    marginBottom: 'auto',
    }} source={require('../UI/Img/file.png')}/>
</TouchableOpacity>




*/


const styles = StyleSheet.create({
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
        marginLeft: 55,
        marginTop: 49,
        width: '70%',
    },
    input:{
        marginTop: 'auto',
        width: '80%',
        height: '20%',
        paddingLeft: 26,
        borderTopColor: 'rgba(138, 184, 93, 1)',
        borderTopWidth: 1,
    },
    message:{
        width: '100%',
        height: '80%',
        position: 'absolute',
    },
})