import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Background, FullWidthButton, Header, InfoCard } from "../../../components/common_components";
import userData from "../../../../../assets/data/userData.json";
import styles from "./styles";

const userProof = userData[0]; //SOLO USO DE PRUEBAS

const PasswordRecoveryEmailScreen = () => {

    const navigation = useNavigation();

    const onPressReturn = () => {
        navigation.navigate('PinScreen');
    }
    const onPressSendMail = () => { }
    const onPressDontAcces = () => { }

    const userMail = () => {
        const parts = userProof.user_email.split('@');
        if (parts.length === 2) {
            const [username, domain] = parts;
            const hiddenUsername = username.charAt(0) + '*'.repeat(username.length - 1);
            const hiddenDomain = domain.charAt(0) + '*'.repeat(domain.length - 1);
            return `${hiddenUsername}@${hiddenDomain}`;
        }
        return userProof.user_email;
    }

    return (
        <Background>
            <Header
                iconName={"arrow-left"}
                iconColor={"#604AD9"}
                onPress={onPressReturn}
            />

            <InfoCard
                iconName={"envelope-open"}
                iconColor={"#604AD9"}
                title={"Te enviaremos un correo"}
                description={"Para recuperar tu clave, vamos a enviarte las indicaciones a tu casilla de correo."}
            >

                <View style={styles.mailContainer}>
                    <Text style={styles.mailTitle}>TE LO ENVIAMOS A</Text>
                    <Text style={styles.mail}>{userMail()}</Text>
                </View>

            </InfoCard>

            <FullWidthButton
                label={"ENVIARME CORREO"}
                onPress={onPressSendMail}
                backgroundColor={"#604AD9"}
            />
            <FullWidthButton
                label={"NO TENGO ACCESO A MI CORREO"}
                onPress={onPressDontAcces}
                backgroundColor={"#2B2446"}
            />
        </Background>
    );
};

export default PasswordRecoveryEmailScreen;