import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";

import { Background, FullWidthButton, TitleInputText, Header } from "../../../components/common_components";
import SignInScreenHelper from "./helper";
import Auth from "../../../../services/AuthService";
import styles from "./styles";

const SignInScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(Auth.getCurrentUser());

    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged((user) => setUser(user));
        return () => unsubscribe();
    }, []);

    const isValidEmail = () => SignInScreenHelper.isValidEmail(email);
    const isValidPassword = () => SignInScreenHelper.isValidPassword(password);

    const onPressReturn = () => navigation.navigate("PresentationScreen");
    const onPressContinue = async () => await SignInScreenHelper.onPressContinue(
        email,
        password,
        () => navigation.navigate("TabNavigator")
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
            <Text style={styles.title}>¡Bienvenido de regreso!</Text>
            <Text style={styles.description}>Ingresá tu correo y tu contraseña y volvé a disfrutar de los beneficios de la app</Text>
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
                <ValidationMessage condition={!isValidPassword()} message={"Ingrese una constraseña válida"} />
                {/* <TitleInputText
                    text={phoneNumber}
                    onChangeText={setPhoneNumber}
                    title={"Ingrese su número de celular"}
                    inputMode={"tel"}
                />
                <ValidationMessage condition={!isValidPhone()} message={"Ingrese un número válido"} /> */}
            </View>
            <FullWidthButton label={"SIGUIENTE"} onPress={onPressContinue} backgroundColor={"#604AD9"} />
        </Background>
    );
};

export default SignInScreen;