import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    keyboardContainer: {
        top: 20,
        alignItems: "center",
    },
    numberContainer: {
        padding: 10,
        flexDirection: "row",
        flexWrap: "wrap", 
    },
    number: { 
        margin: 5,
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.04)",
    },
    numberText: {
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "bold"
    }
});

export default styles;  