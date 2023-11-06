import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    modalContainer: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: { 
        backgroundColor: "#353535",
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: "center",
    },
    modalTitle: {
        color: "white",
        fontSize: 14,
        marginBottom: 10
    },
    modalText: {
        fontSize: 11,
        color: "white",
        textAlign: "center",
        marginBottom: 10,
    },

    buttonsContainer: { 
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 30,
        justifyContent: "space-between"
    },
    buttonText: {
        fontSize: 12, 
        fontWeight: "400",
        marginTop: 10,
    },
});

export default styles;  