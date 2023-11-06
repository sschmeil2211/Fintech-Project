import { Alert } from "react-native";
import Auth from "../../../../services/AuthService";

class SignInScreenHelper {
    static isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);
    static isValidPassword = (password: string) => password.length > 7;

    static onPressContinue = async (
        email: string,
        password: string,
        navigateTo: Function
    ) => {
        if (!SignInScreenHelper.isValidEmail(email) || !SignInScreenHelper.isValidPassword(password)) return;
        const result = await Auth.signIn(email, password);
        if (result.success)
            navigateTo();
        else
            Alert.alert(
                "Error",
                result.error,
                [{text: "Volver", style: "cancel"}],
            );
    };
}

export default SignInScreenHelper;