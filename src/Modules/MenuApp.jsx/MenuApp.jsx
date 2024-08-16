import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const MenuApp = () =>{
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InServices')}><Text style={styles.text}>Услуги</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Applications')}><Text style={styles.text}>Мои заявки</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Payment')}><Text style={styles.text}>Оплата</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Message')}><Text style={styles.text}>Сообщения</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SpeedTest')}><Text style={styles.text}>Помощь в устранении неполадок</Text></TouchableOpacity>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Questions')}><Text style={styles.text}>Вопросы-Ответы</Text></TouchableOpacity>
            <TouchableOpacity style={{width: '100%',height: '12.5%',}} onPress={() => navigation.navigate('Contacts')}><Text style={styles.text}>Контакты</Text></TouchableOpacity>
        </View>
    )
}

//<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}><Text style={styles.text}>Чат с тех. поддержкой</Text></TouchableOpacity>


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(13, 112, 0, 1)',
        width: '90%',
        height: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 15,
        marginTop: 'auto',
        marginBottom: '22%',
    },
    button:{
        width: '100%',
        height: '14.5%',
        borderBottomWidth: 1,
        borderColor: 'white',
    },
    text:{
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        color: 'white',
    }
})