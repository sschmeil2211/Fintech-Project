import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { Background, Header, Card, CommonModal, TitleInputText } from "../../components/common_components";
import { TransferContent } from "../../components/transfer_screen_components";
import { getInitialsName } from "../../../utils/utils";
import styles from "./styles";
import BankAccount from "../../../models/BankAccount";
import { useUserProvider } from "../../../view_models/providers/UserProvider"; 
import Helper from "./helper";

const SendTransferScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { contactToTransfer, contactBankToTransfer, contactCVU } = route.params;
    const user = useUserProvider().getUser();

    const [transferData, setTransferData] = useState({
        userData: contactToTransfer,
        bankData: contactBankToTransfer,
        cvu: "",
        message: "",
        reason: "Varias"
    });
    const [enteredValue, setEnteredValue] = useState("");
    const [data, setData] = useState({
        profileText: contactToTransfer ? getInitialsName(`${transferData.userData.firstName} ${transferData.userData.lastName}`) : "",
        profileTextColor: contactToTransfer ? transferData.userData.userColor : "",
        userName: contactToTransfer ? `${transferData.userData.firstName} ${transferData.userData.lastName}` : "",
        cvu: contactCVU ?? transferData.cvu,
        cuilCuit: contactToTransfer ? transferData.userData.cuilCuit : "",
        balance: user.balance,
        source: contactToTransfer ? Helper.getBankImages[contactBankToTransfer.name] : ""
    });

    const onPressHeaderIcon = () => transferData.userData && !contactToTransfer
        ? setTransferData({ userData: null, bankData: null })
        : navigation.navigate("TransferScreen");

    const onPressSend = async () => await Helper.createTransfer(
        user,
        contactCVU ?? data.cvu,
        enteredValue,
        transferData.reason,
        transferData.message
    ); 

    const onPressSearch = async () => {
        const contact = await BankAccount.getUserByCVU(transferData.cvu);
        const bank = await (await BankAccount.getBankAccountByCVU(transferData.cvu)).getBankDetails();
        setTransferData({ userData: contact, bankData: bank });
        setData({
            profileText: getInitialsName(`${contact.firstName} ${contact.lastName}`),
            profileTextColor: contact.userColor,
            userName: `${contact.firstName} ${contact.lastName}`,
            cvu: transferData.cvu,
            cuilCuit: contact.cuilCuit,
            balance: user.balance,
            source: Helper.getBankImages[bank.name]
        });
    };

    const titleInputRender = () => {
        if (!transferData.userData)
            return (
                <View style={styles.inputContainer}>
                    <TitleInputText
                        title={"Ingrese un cvu o alias"}
                        inputMode={"text"}
                        text={transferData.cvu}
                        onChangeText={(text) => setTransferData({ ...transferData, cvu: text })}
                        titleBGColor={"#252525"}
                    />
                    <TouchableOpacity onPress={onPressSearch}>
                        <Text style={styles.buttonSearch}>Buscar</Text>
                    </TouchableOpacity>
                </View>
            );
    };

    const iconName = () => {
        if (contactToTransfer || !transferData.userData)
            return "arrow-left";
        else if (!contactToTransfer)
            return "undo";
    };

    return (
        <Background>
            <Header iconColor={"#604AD9"} iconName={iconName()} onPress={onPressHeaderIcon} />
            <View style={{ marginHorizontal: 20 }}>
                {titleInputRender()}
                {transferData.userData ? <KeyboardAvoidingView keyboardVerticalOffset={70} behavior="height" style={{ width: "100%", marginTop: 30 }}>
                    <TransferContent
                        data={data}
                        onPressSend={onPressSend}
                        onPressRequest={() => console.log(transferData.bankData.name)}
                        enteredValue={enteredValue}
                        setEnteredValue={setEnteredValue}
                        reason={transferData.reason}
                        setReason={(text) => setTransferData({ ...transferData, reason: text })}
                        message={transferData.message}
                        setMessage={(text) => setTransferData({ ...transferData, message: text })}
                    />
                </KeyboardAvoidingView> : null}
            </View>
        </Background>
    );
};

export default SendTransferScreen;