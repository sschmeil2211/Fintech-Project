import React from "react";
import { View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { FullWidthButton, Header, Background, InfoCard } from "../../../components/common_components";
import styles from "./styles";

const WarningResetPasswordScreen = () => {

    const navigation = useNavigation();
    const onPressNext = () => {
        navigation.navigate('ResetProcessScreen');
    }
    const onPressReturn = () => {
        navigation.navigate('PinScreen');
    }

    return (
        <Background>
            <Header
                iconName={"arrow-left"}
                iconColor={"#604AD9"}
                onPress={onPressReturn}
            />

            <InfoCard
                iconName={"lock"}
                iconColor={"#604AD9"}
                title={"Crear nueva clave"}
                description={"Para estar seguros que efectivamente sos vos quien está solicitando una nueva clave, vamos a pedirte que completes un par de pasos."}
            >
                <View style={styles.warningContainer}>
                    <Text style={styles.warning}>Necesitás acceso al correo de tu cuenta</Text>
                </View>
            </InfoCard>

            <FullWidthButton
                label={"SIGUIENTE"}
                onPress={onPressNext}
                backgroundColor={"#604AD9"}
            />
        </Background>
    );
};

export default WarningResetPasswordScreen;