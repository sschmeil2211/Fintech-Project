import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        alignItems: "center",
        top: 25
    },
    balanceText: {
        color: "#9284A8",
        fontWeight: "600",
        fontSize: 16
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#252525",
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    portfolio: {
        flexDirection: "row",
        marginVertical: 20,
        justifyContent: "space-between",
        alignContent: "center"
    },
    currencyType: {
        color: "white",
        fontSize: 12
    }, 
    hideCurrencyContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 12,
        color: "white",
        fontWeight: "bold",
        paddingBottom: 5
    },
    description: {
        fontSize: 10,
        color: "white",
    },
    textContainer: {
        width: "75%"
    },
});

export default styles; 