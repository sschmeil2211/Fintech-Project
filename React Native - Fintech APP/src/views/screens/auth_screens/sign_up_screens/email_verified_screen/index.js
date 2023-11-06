import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Background, FullWidthButton, Header, NumericKeyboard, InfoCard } from "../../../../components/common_components";
import AsyncStorageService from "../../../../../services/AsynStorageService";
import Auth from "../../../../../services/AuthService";
import EmailVerifiedHelper from "./helper";

const EmailVerifiedScreen = () => {
    const navigation = useNavigation();
    const [isVerified, setIsVerified] = useState(false);
    const onPressGoToMail = () => EmailVerifiedHelper.onPressGoToMail();
    const onPressCheckUser = async () => {
        await Auth.reloadUser();
        setIsVerified(await Auth.getEmailVerified())
        if (isVerified) {
            const data = await AsyncStorageService.getUserLocally();
            const userData = { ...data, id: Auth.getCurrentUser().uid };
            await AsyncStorageService.saveUserLocally(userData);
            navigation.navigate("PersonalInfoScreen")
        }
    };

    return (
        <Background>
            <InfoCard
                iconName={isVerified ? "check" : "envelope"}
                iconColor={"#604AD9"}
                title={isVerified ? "Cuenta Verificado" : "Verificar cuenta"}
                description={isVerified ? "Acabás de confirmar tu cuenta.\nPresiona SIGUIENTE y continuá el registro" : "Debes dirigirte a tu email para verificar tu cuenta.\nLuego comprobá tu usuario en la app para continuar con el registro"}
            />
            {!isVerified
                ? <FullWidthButton label={"IR AL MAIL"} onPress={onPressGoToMail} backgroundColor={"#604AD9"} />
                : null
            }
            <FullWidthButton
                label={isVerified ? "SIGUIENTE" : "COMPROBAR USUARIO"}
                onPress={onPressCheckUser}
                backgroundColor={"#604AD9"}
            />
        </Background>
    );
};

export default EmailVerifiedScreen;