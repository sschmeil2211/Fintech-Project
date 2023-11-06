import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    analyticRow: {
        flexDirection: "row",
        justifyContent: "center"
    },
    analyticContainer: {
        backgroundColor: "#252525",
        borderRadius: 10,
        padding: 20,
        width: 170,
        alignItems: "center",
        margin: 10
    },
    analyticTitle: {
        color: "white",
        marginBottom: 10
    },
    analyticBody: {
        color: "white",
        fontSize: 18,
        fontWeight: "600"
    }
});

export default styles; 