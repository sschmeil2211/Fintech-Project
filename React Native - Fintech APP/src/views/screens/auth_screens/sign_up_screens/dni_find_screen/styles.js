import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: "white",
        fontSize: 12,
        marginHorizontal: 15,
        marginTop: 10,
        textAlign: "center",
    },
    circleRow: {
        flexDirection: "row"
    },
    circle: {
        height: 15,
        width: 15,
        borderRadius: 20,
        marginTop: 10,
        marginHorizontal: 5
    },
    button: {
        backgroundColor: "#604AD9",
        paddingHorizontal: 30,
        paddingVertical: 10,
        color: "white",
        fontWeight: "bold",
        borderRadius: 10
    }
});

export default styles; 