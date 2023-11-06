import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: "center",
        marginVertical: 10
    },
    bankContainer: {
        position: "absolute",
        paddingLeft: 50
    },
    profileInfo: {
        alignItems: "center"
    },
    name: {
        color: "white",
        fontWeight: "500"
    },
    balance: {
        color: "white",
        fontSize: 12,
        marginTop: 5
    },
    valueContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 40
    },
    symbol: {
        color: "white",
        fontSize: 16,
        right: 10
    },
    value: {
        color: "white",
        fontSize: 50
    }, 
    buttonContainer: {
        alignItems: "center"
    },
    button: {
        width: 100,
        marginTop: 30,
        borderRadius: 20,
        paddingVertical: 5,
        backgroundColor: "#604AD9",
        alignItems: "center",
    }, 
});

export default styles; 