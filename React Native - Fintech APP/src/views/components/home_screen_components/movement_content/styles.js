import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    dataColumn: {
        flexDirection: "column",
        alignItems: "center",
        marginVertical: 10
    },
    movementType: {
        fontSize: 15,
        color: "white",
        padding: 5
    },
    date: {
        color: "#545454",
        fontSize: 11
    },    
    container: { 
        marginBottom: 10 
    }
});

export default styles;  