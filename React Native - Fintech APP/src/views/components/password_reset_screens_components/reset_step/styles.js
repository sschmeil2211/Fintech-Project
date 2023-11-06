import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    stepRow: {  
        flexDirection: "row", 
        alignItems: "center", 
        marginVertical: 10
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
        height: 40,
        width: 40
    },
    stepInfo: { 
        paddingLeft: 15,
        paddingRight: 80, 
    },
    stepTitle: { 
        color: "white",
        fontSize: 16,
        fontWeight: "bold" 
    },
    stepDescription: {
        color: "white",
        fontSize: 14,
        fontWeight: "300"  
    }
});

export default styles; 