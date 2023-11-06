class Helper {
    static getBankImages = {
        APP: require(`../../../../assets/images/banks/ICBC.png`),
        ICBC: require(`../../../../assets/images/banks/ICBC.png`),
        BankOfAmerica: require("../../../../assets/images/banks/BankOfAmerica.png"),
        HSBC: require("../../../../assets/images/banks/HSBC.png"),
        JPMorganChase: require("../../../../assets/images/banks/JPMorganChase.png"),
    };

    static getbuttonsConfig = [
        {
            backgroundColor: "#231223",
            iconColor: "#604AD9",
            iconName: "plus",
            text: "NUEVA",
            textColor: "#604AD9"
        },
        {
            backgroundColor: "#191919",
            iconColor: "white",
            iconName: "qrcode",
            text: "LEER QR",
            textColor: "white"
        },
        {
            backgroundColor: "#191919",
            iconColor: "white",
            iconName: "divide",
            text: "DIVIDIR",
            textColor: "white"
        }
    ];
}

export default Helper;