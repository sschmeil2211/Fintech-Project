import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 25,
    },
    title: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    description: {
        color: "white",
        textAlign: "center",
        fontSize: 14,
        padding: 20,
    },
    validationContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
        marginHorizontal: 15,
    },
    validationText: {
        color: "white",
        fontSize: 12,
        paddingLeft: 5
    }, 
});

export default styles; 