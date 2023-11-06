import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({ 
    textInput: { 
        color: "white", 
        fontSize: 12, 
        paddingHorizontal: 20, 
        paddingVertical: 5, 
        backgroundColor: "#191919", 
        borderRadius: 20, 
        marginTop: 10  
    },
    buttonRow: { 
        flexDirection: "row", 
        marginVertical: 15, 
        marginHorizontal: 10, 
        justifyContent: "space-between" 
    },
    button: { 
        backgroundColor: "#604AD9", 
        width: 130, 
        paddingVertical: 10, 
        alignItems: "center", 
        borderRadius: 10 
    },
    buttonText: {
        color: "white",
        fontSize: 13,
        fontWeight: "bold"
    }
});

export default styles;