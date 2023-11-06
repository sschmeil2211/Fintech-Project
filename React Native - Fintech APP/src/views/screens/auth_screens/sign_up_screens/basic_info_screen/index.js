import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";

import { Background, FullWidthButton, TitleInputText, Header } from "../../../../components/common_components";
import BasicInfoHelper from "./helper";
import Auth from "../../../../../services/AuthService";
import styles from "./styles";

const BasicInfoScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("+54");
    const [user, setUser] = useState(Auth.getCurrentUser());

    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged((user) => setUser(user));
        return () => unsubscribe();
    }, []);

    const isValidEmail = () => BasicInfoHelper.isValidEmail(email); 
    const isValidPhone = () => BasicInfoHelper.isValidPhone(phoneNumber);
    const passwordRules = () => BasicInfoHelper.passwordRules(password);

    const onPressReturn = () => navigation.navigate("PresentationScreen");
    const onPressContinue = async () => await BasicInfoHelper.onPressContinue(
        email,
        password,
        phoneNumber,
        () => navigation.navigate("EmailVerifiedScreen")
    );

    const ValidationMessage = ({ condition, message }) => {
        return condition ? (
            <View style={styles.validationContainer}>
                <Icon name="times" size={12} color={"red"} />
                <Text style={styles.validationText}>{message}</Text>
            </View>
        ) : null;
    };

    return (
        <Background>
            <Header iconName="arrow-left" iconColor="#604AD9" onPress={onPressReturn} />
            <Text style={styles.title}>¡Empecemos!</Text>
            <Text style={styles.description}>Ingresá un correo electrónico válido para registrarte en Brubank.{"\n"}Te recomendamos usar un correo electrónico personal al que tengas acceso desde tu celular</Text>
            <View style={styles.container}>
                <TitleInputText
                    text={email}
                    onChangeText={setEmail}
                    title={"Ingrese un correo electrónico"}
                    inputMode={"email"}
                />
                <ValidationMessage condition={!isValidEmail()} message={"Ingrese un mail válido"} />
                <TitleInputText
                    text={password}
                    onChangeText={setPassword}
                    title={"Ingrese una contraseña"}
                    inputMode={"text"}
                    secureTextEntry={true}
                />
                {passwordRules().map((rule, index) => (
                    <ValidationMessage key={index} condition={rule.condition} message={rule.message} />
                ))}
                <TitleInputText
                    text={phoneNumber}
                    onChangeText={setPhoneNumber}
                    title={"Ingrese su número de celular"}
                    inputMode={"tel"}
                />
                <ValidationMessage condition={!isValidPhone()} message={"Ingrese un número válido"} />
            </View>
            <FullWidthButton label={"SIGUIENTE"} onPress={onPressContinue} backgroundColor={"#604AD9"} />
        </Background>
    );
};

export default BasicInfoScreen;