import React from "react"; 
import { View, Text } from "react-native"; 
import { useNavigation } from '@react-navigation/native';

import { Background, Header, FullWidthButton } from "../../../components/common_components"; 
import { ResetStep } from "../../../components/password_reset_screens_components"; 
import styles from "./styles";

const ResetProcessScreen = () => {

    const navigation = useNavigation();
    const onPressClose = () => {
        navigation.navigate('PinScreen');
    }
    const onPressReady = () => {
        navigation.navigate('DNIInputScreen');
    }

    const renderSteps = () => {
        return (
            <>
                <ResetStep
                    icon={"id-card"}
                    title={"Completar DNI"}
                    description={"Vamos a pedirte que escribas tu DNI correctamente."}
                    color={"orange"}
                />
                <ResetStep
                    icon={"envelope"}
                    title={"Recibirás un correo"}
                    description={"Asegurate de tener acceso a tu casilla de email desde tu celular."}
                    color={"blue"}
                />
                <ResetStep
                    icon={"smile"}
                    title={"Verificar identidad"}
                    description={"Vas a tener que filmar un video selfie para que podamos corroborar tu identidad."}
                    color={"green"}
                />
            </>
        )
    };

    return (
        <Background>
            <Header
                iconColor={"white"}
                iconName={"times-circle"}
                onPress={onPressClose}
            />

            <View style={styles.textContainer}>
                <Text style={styles.text}>Por tu seguridad, este es el proceso de reinicio</Text>
            </View>

            <View style={styles.column}>
                {renderSteps()}
            </View>

            <FullWidthButton
                label={"EMPEZAR"}
                onPress={onPressReady}
                backgroundColor={"#604AD9"}
            />
        </Background>
    );
};

export default ResetProcessScreen;