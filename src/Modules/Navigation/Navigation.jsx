import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainPages } from "../../Pages/MainPages";
import { Contacts } from "../../Pages/Contacts";
import { SpeedTest } from "../../Pages/SpeedTest";
import { Payment } from "../../Pages/Payment";
import { Applications } from "../../Pages/Applications";
import { InServices } from "../../Pages/InServices";
import { AddServices } from "../../Pages/AddServices";
import { Message } from "../../Pages/Message";
import { Chat } from "../../Pages/Chat";
import { Register } from "../../Pages/Register/Register";
import { RegisteContract } from "../../Pages/Register/RegisteContract";
import { Questions } from "../../Pages/Questions";

const Stack = createNativeStackNavigator();

export const Navigation = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
                <Stack.Screen name="Questions" component={Questions} options={{headerShown: false}}/>
                <Stack.Screen name="Payment" component={Payment} options={{headerShown: false}}/>            
                <Stack.Screen name="Applications" component={Applications} options={{headerShown: false}}/>
                <Stack.Screen name="SpeedTest" component={SpeedTest} options={{headerShown: false}}/>   
                <Stack.Screen name="AddServices" component={AddServices} options={{headerShown: false}}/> 
                <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
                <Stack.Screen name="RegisteContract" component={RegisteContract} options={{headerShown: false}}/>
                <Stack.Screen name="MainPages" component={MainPages} options={{headerShown: false}}/>
                <Stack.Screen name="Contacts" component={Contacts} options={{headerShown: false}}/>
                <Stack.Screen name="InServices" component={InServices} options={{headerShown: false}}/>
                <Stack.Screen name="Message" component={Message} options={{headerShown: false}}/>    
            </Stack.Navigator>
        </NavigationContainer>
    )
}