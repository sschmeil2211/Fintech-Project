import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; 

import {
    PinScreen,
    WarningResetPasswordScreen,
    ResetProcessScreen,
    DNIInputScreen,
    PasswordRecoveryEmailScreen,
    PresentationScreen,
    BasicInfoScreen,
    PersonalInfoScreen, 
    EmailVerifiedScreen,
    LastInfoScreen,
    DNIFindScreen,
    SignInScreen
} from "../views/screens";
import TabNavigator from './TabNavigation';
import Auth from '../services/AuthService';

const Stack = createNativeStackNavigator();

const PasswordRecoveryStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="WarningResetPasswordScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WarningResetPasswordScreen" component={WarningResetPasswordScreen} />
            <Stack.Screen name="ResetProcessScreen" component={ResetProcessScreen} />
            <Stack.Screen name="DNIInputScreen" component={DNIInputScreen} />
            <Stack.Screen name="PasswordRecoveryEmailScreen" component={PasswordRecoveryEmailScreen} />
        </Stack.Navigator>
    );
};

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="PresentationScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PresentationScreen" component={PresentationScreen} />

            <Stack.Screen name="BasicInfoScreen" component={BasicInfoScreen} />
            <Stack.Screen name="EmailVerifiedScreen" component={EmailVerifiedScreen} />
            <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
            <Stack.Screen name="LastInfoScreen" component={LastInfoScreen} />
            <Stack.Screen name="DNIFindScreen" component={DNIFindScreen} />

            <Stack.Screen name="SignInScreen" component={SignInScreen} />
        </Stack.Navigator>
    );
};

const AppNavigator = () => {
    const [user, setUser] = useState(Auth.getCurrentUser());
    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged((user) => setUser(!!user));
        return () => unsubscribe();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={user ? "TabNavigator" : "Auth"} //Pantalla inicial debe ser PinScreen
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="PinScreen" component={PinScreen} />
                <Stack.Screen name="TabNavigator" component={TabNavigator} />
                <Stack.Screen name="Auth" component={AuthStack} />
                <Stack.Screen name="PasswordRecovery" component={PasswordRecoveryStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;