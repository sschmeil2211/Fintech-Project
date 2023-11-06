import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

import {
    HomeHeader,
    Balance,
    MovementButton,
    Notice,
    MoneyMovements, 
} from '../../components/home_screen_components';
import { Background } from '../../components/common_components';
import { getInitialsName } from "../../../utils/utils"; 
import styles from "./styles";
import Auth from "../../../services/AuthService"; 
import { useUserProvider } from "../../../view_models/providers/UserProvider"; 

const HomeScreen = () => {

    const navigation = useNavigation();
    const user = useUserProvider().getUser(); 
    const transferHistory = useUserProvider().getTransferHistory(); 

    const userProfileText = user ? getInitialsName(user.firstName, user.lastName) : '';
    const userColor = user ? user.userColor : "#FFFFFF";
    const userBalance = user ? user.balance : 0;

    const onPressInvest = () => navigation.navigate("InvestmentsScreen");
    const onPressSignOut = async () => {
        try {
            await Auth.signOut();
            navigation.navigate("Auth"); // Redirige a la pantalla de inicio de sesión
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }; 

    return (
        <Background>
            <HomeHeader profileText={ userProfileText } profileTextColor={ userColor }>
                <TouchableOpacity onPress={onPressSignOut} style={{ marginRight: 10 }}>
                    <Icon
                        name="sign-out"
                        size={35}
                        color={"#604AD9"}
                    />
                </TouchableOpacity>
                {/* <Image
                    source={require("../../../assets/images/promotion.png")}
                    style={styles.announcement}
                /> */}
            </HomeHeader>
            <Balance amount={userBalance} />
            <View style={styles.bodyColumn}>
                <View style={styles.buttonsContainer}>
                    <MovementButton icon={"qrcode"} text={"Pago QR"} />
                    <MovementButton onPress={onPressInvest} icon={"chart-line"} text={"Inversiones"} />
                    <MovementButton icon={"money-bill"} text={"Préstamos"} />
                    <MovementButton icon={"long-arrow-alt-down"} text={"Retiros"} />
                </View>
                <Notice />
                <MoneyMovements userData={transferHistory} />
            </View>
        </Background>
    );
};

export default HomeScreen;   