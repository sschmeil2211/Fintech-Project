import { openInbox } from "react-native-email-link";
import AsyncStorageService from "../../../../services/AsynStorageService";
import Auth from "../../../../services/AuthService";

class EmailVerifiedHelper { 
    static onPressGoToMail = () => openInbox();  
}

export default EmailVerifiedHelper;