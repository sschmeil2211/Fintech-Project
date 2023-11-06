import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FAIcons5 from 'react-native-vector-icons/FontAwesome5';

import {
    HomeScreen,
    InvestmentsScreen,

    CardScreen,

    TransferScreen, 
    SendTransferScreen,

    AnalysisScreen,
    ServicesScreen
} from "../views/screens";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabIcons = {
    HomeStack: "home",
    CardScreen: "credit-card",
    TransferStack: "retweet",
    AnalysisScreen: "chart-line",
    ServicesScreen: "file",
};

const screenOptions = ({ route }) => ({
    tabBarStyle: { backgroundColor: "#000000", borderTopColor: "#000000" },
    tabBarActiveTintColor: "#604AD9",
    tabBarInactiveTintColor: "#6F6C7F",
    tabBarShowLabel: false,
    headerShown: false,
    tabBarIcon: ({ color }) => {
        const iconName = tabIcons[route.name];
        return <FAIcons5 name={iconName} size={25} color={color} />;
    }
}); 

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} /> 
            <Stack.Screen name="InvestmentsScreen" component={InvestmentsScreen} /> 
        </Stack.Navigator>
    );
};

const TransferStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="TransferScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TransferScreen" component={TransferScreen} /> 
            <Stack.Screen name="SendTransferScreen" component={SendTransferScreen} /> 
        </Stack.Navigator>
    );
};

const TabNavigator = (props) => {
    return (
        <Tab.Navigator initialRouteName="AnalysisScreen" screenOptions={screenOptions}>
            <Tab.Screen name="HomeStack" component={HomeStack} />
            <Tab.Screen name="CardScreen" component={CardScreen} />
            <Tab.Screen name="TransferStack" component={TransferStack} />
            <Tab.Screen name="AnalysisScreen" component={AnalysisScreen} />
            <Tab.Screen name="ServicesScreen" component={ServicesScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator