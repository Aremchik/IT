import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import { MenuApp } from "../Modules/MenuApp.jsx/MenuApp";
import { useNavigation } from '@react-navigation/native';

export const Menu = () =>{

    const [modal, setModal] = useState(false);
    
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Modal
            animationType="fade" 
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}
            >   
                <TouchableOpacity onPress={()=> {setModal(!modal);}} style={styles.modalClose}></TouchableOpacity>
                <MenuApp/>
            </Modal>
            <TouchableOpacity style={styles.buttonTouch} onPress={() => navigation.navigate('MainPages')}><Image style={styles.homeImg} source={require('../UI/Img/home.png')}/></TouchableOpacity>
            <TouchableOpacity style={styles.buttonTouch} onPress={()=> {setModal(!modal);}}>
                <View style={styles.homeImg}>
                    <Image style={styles.menu} source={require('../UI/Img/menu.png')}/>
                    <Image style={styles.menu} source={require('../UI/Img/menu.png')}/>
                    <Image style={styles.menu} source={require('../UI/Img/menu.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(20, 20, 20, 0.52)',
        width: '100%',
        height: '10%',
        marginTop: 'auto',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 34,
        paddingRight: 34,
    },
    buttonTouch:{
        marginTop: 'auto',
        marginBottom: 'auto',
        backgroundColor: 'white',
        width: 45, 
        height: 45,
        borderRadius: 25,
    },
    homeImg:{
        marginTop: 'auto',
        marginBottom: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    menu:{
        marginTop: 3,
        marginBottom: 3,
    },
    modalClose:{
        width: '100%',
        height: '100%',
    }
})