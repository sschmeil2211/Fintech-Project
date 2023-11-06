import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    noticeContainer: {
        flexDirection: "row",
        marginTop: 30,
        height: 80,
        width: "100%",
        backgroundColor: "#007F20",
        borderRadius: 15,
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center"
    },
    labelsContainer: {
        width: "50%"
    },
    noticeLabel: {
        color: "white",
        fontSize: 13,
        fontWeight: "bold"
    },
    buttonLabel: {
        color: "white",
        fontSize: 12,
        fontWeight: "500"
    },
    moneyImage: {
        width: 65,
        height: 65
    }
});

export default styles; 