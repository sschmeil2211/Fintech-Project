import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonContainer: {
        borderColor: "black",
        borderWidth: 1.5,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 5
    },
    buttonTypeContainer: {
        flexDirection: "row"
    },
    buttonText: {
        paddingLeft: 10,
        color: "white"
    }
});

export default styles;  