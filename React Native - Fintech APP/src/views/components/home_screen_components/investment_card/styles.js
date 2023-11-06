import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#252525",
        marginVertical: 20,
        marginHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: "center",
    },
    informationContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        justifyContent: "space-between"
    },
    label: {
        color: "white",
        fontWeight: "900",
    },
    valueContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    value: {
        color: "white",
        marginHorizontal: 5
    },
    errorLabel: {
        color: "red",
        fontWeight: "600",
        fontSize: 13
    },  
    description: {
        marginHorizontal: 15,
        marginTop: 10,
        textAlign: "center",
        color: "white"
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 25
    },
    button: {
        backgroundColor: "#604AD9",
        paddingHorizontal: 25,
        marginHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        color: "white"
    }
});

export default styles; 