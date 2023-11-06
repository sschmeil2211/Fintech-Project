import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    textContainer: { 
        alignItems: "center",  
        marginVertical: 15,
    },
    text: {
        fontWeight: "600",
        color: "white",
        fontSize: 13
    }, 
    column: {
        flex: 1,
        flexDirection: "column",  
        marginHorizontal: 10
    }
});

export default styles; 