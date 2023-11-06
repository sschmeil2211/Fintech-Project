import React from "react";
import { Text, Image, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Background, FullWidthButton } from "../../../components/common_components";
import styles from "./styles";

const PresentationScreen = () => { 

    const navigation = useNavigation();
    const onPressSignUp = () => navigation.navigate('BasicInfoScreen'); 
    const onPressSignIn = () => navigation.navigate('SignInScreen'); 

    return (
        <Background>
            <View style={styles.container}>
                <Image
                    source={require("../../../../../assets/images/presentation.png")}
                    resizeMode="contain"
                    style={styles.image}
                />
                <Text style={styles.title}>Somos un banco en una app</Text>
                <Text style={styles.description}>Abrí tu cuenta de forma simple y rápida. No pagas mantenimiento, ni resúmenes, ni gastos de apertura, ni movimientos en cajeros automáticos.</Text>
            </View>
            <FullWidthButton
                label={"CREAR CUENTA GRATIS"}
                onPress={onPressSignUp}
                backgroundColor={"#604AD9"}
            />
            <FullWidthButton
                label={"YA TENGO CUENTA"}
                onPress={onPressSignIn}
                backgroundColor={"#2B2446"}
            />
        </Background>
    );
};

export default PresentationScreen;   