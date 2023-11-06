import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    textContainer: {
        alignItems: "center",
        margin: 10,
    },
    text: {
        color: "white",
        fontSize: 16
    },
    codeContainer: {
        marginVertical: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: "100%"
    },
    code: {
        width: 10,
        height: 10,
        borderRadius: 50,
        borderWidth: 1,
        backgroundColor: "#808080",
        marginHorizontal: 5
    },
});

export default styles; 