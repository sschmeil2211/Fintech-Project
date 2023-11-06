class Helper {
    static getBankImages = {
        APP: require(`../../../../assets/images/banks/ICBC.png`),
        ICBC: require(`../../../../assets/images/banks/ICBC.png`),
        BankOfAmerica: require("../../../../assets/images/banks/BankOfAmerica.png"),
        HSBC: require("../../../../assets/images/banks/HSBC.png"),
        JPMorganChase: require("../../../../assets/images/banks/JPMorganChase.png"),
    }; 

    static createTransfer = async (user, cvu, enteredValue, reason, message) => {
        try {
            const receiverCVU = cvu; // Cambia esto con el CVU real del destinatario
            const amount = parseFloat(enteredValue); // Cambia esto con la cantidad deseada
            const reasonToReceiver = reason;
            const messageToReceiver = message;
            await user.transferMoneyByCVU(receiverCVU, amount, reasonToReceiver, messageToReceiver);
        } catch (error) {
            console.error('Error creating transfer:', error);
        }
    };
}

export default Helper;