import { Alert } from "react-native";
import Auth from "../../../../../services/AuthService";
import AsyncStorageService from "../../../../../services/AsynStorageService";

class BasicInfoHelper {

    static passwordRules = (password: string) => [
        { condition: !/[A-Z]/.test(password), message: "Debe tener al menos una mayúscula" },
        { condition: !/[a-z]/.test(password), message: "Debe tener al menos una minúscula" },
        { condition: !/\d/.test(password), message: "Debe tener al menos un número" },
        { condition: !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password), message: "Debe tener al menos un símbolo" },
        { condition: password.length < 8, message: "Debe tener al menos 8 caracteres" },
        { condition: /\d{4,}/.test(password), message: "No puede tener más de 3 números en secuencia" },
    ];

    static isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);
    static isValidPassword = (password: string) => BasicInfoHelper.passwordRules(password).every((rule) => !rule.condition);
    static isValidPhone = (phoneNumber: string) => phoneNumber.length >= 10;

    static onPressContinue = async (
        email: string,
        password: string,
        phoneNumber: string,
        navigateTo: Function
    ) => {
        if (!BasicInfoHelper.isValidEmail(email) || !BasicInfoHelper.isValidPassword(password) || !BasicInfoHelper.isValidPhone(phoneNumber)) return;
        const result = await Auth.signUp(email, password, phoneNumber);
        if (result.success) {
            const userData = { email: email, phoneNumber: phoneNumber };
            await AsyncStorageService.saveUserLocally(userData);
            navigateTo()
        }
        else
            Alert.alert(
                "Error",
                result.error,
                [{ text: "Volver", style: "cancel" }],
            );
    };
}

export default BasicInfoHelper;