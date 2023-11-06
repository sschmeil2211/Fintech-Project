import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    column: { 
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 25,
    },
    iconContainer: {
        margin: 30,
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center"
    },
    description: {
        color: "white",
        fontSize: 14,
        textAlign: "center",
        fontWeight: "400",
        marginVertical: 15, 
    }
});

export default styles; 