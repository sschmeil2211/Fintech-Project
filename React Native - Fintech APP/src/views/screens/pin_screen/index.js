import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Background, CircleDisplay } from '../../components/common_components';
import { PinHeader, PinCode } from '../../components/pin_screen_components';
import styles from "./styles";
import { getInitialsName } from "../../../utils/utils";
import User from '../../../models/User';

const PinScreen = () => { 
    const navigation = useNavigation();
    const [user, setUser] = useState(null); 
    useEffect(() => {
        async function fetchCurrentUser() {
            try {
                const user = await User.getUser();
                setUser(user);
            } catch (error) {
                console.error('Error fetching current user:', error);
            }
        }
        fetchCurrentUser();
    }, []);

    const handlePinSubmit = (enteredPin) => {   
        if (enteredPin === userPinCode)
            navigation.navigate('TabNavigator');
        else
            console.log('¡PIN incorrecto!');
    };  
    const onPressForgotPassword = () => navigation.navigate('PasswordRecovery');

    const userProfileText = user ? getInitialsName(user.firstName, user.lastName) : '';
    const userPinCode = user ? user.pinCode : '';
    const userColor = user ? user.userColor : "#FFFFFF";

    return (
        <Background>
            <PinHeader onPressForgotPassword={onPressForgotPassword} />
            <View style={styles.container}>
                <CircleDisplay
                    circleType={"profile"}
                    profileText={userProfileText}
                    fontSize={30}
                    size={90}
                    profileTextColor={userColor}
                />
            </View>
            <PinCode onSubmitPin={handlePinSubmit} />
        </Background>
    );
};

export default PinScreen;