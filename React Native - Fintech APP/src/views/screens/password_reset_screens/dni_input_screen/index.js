import React from "react";
import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Background, FullWidthButton, Header, TitleInputText, InfoCard } from "../../../components/common_components";
import userData from "../../../../../assets/data/userData.json";

const userProof = userData[0]; //SOLO USO DE PRUEBAS

const DNIInputScreen = () => {

    const navigation = useNavigation();
    const [text, onChangeText] = useState("");

    const onPressNext = () => {
        if (text == userProof.dni)
            navigation.navigate('PasswordRecoveryEmailScreen');
        else
            console.warn("Los dni no coinciden");
    }
    const onPressReturn = () => {
        navigation.navigate('ResetProcessScreen');
    }

    return (
        <Background>
            <Header
                iconName={"arrow-left"}
                iconColor={"#604AD9"}
                onPress={onPressReturn}
            />

            <InfoCard
                iconName={"id-card"}
                iconColor={"#604AD9"}
                title={"Ingresá tus datos"}
                description={"De esta manera podemos comenzar a recuperar tu clave."}
            >
                <TitleInputText  
                    onChangeText={onChangeText}
                    text={text}  
                    title={"Número de documento"}  
                    inputMode={"numeric"}
                />
            </InfoCard>

            <FullWidthButton
                label={"SIGUIENTE"}
                onPress={onPressNext}
                disabled={text.length < 7 || text.length > 8}
                backgroundColor={"#604AD9"}
            />
        </Background>
    );
};

export default DNIInputScreen;