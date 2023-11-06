import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    container: {
        flex: 1
    },
    image: { 
        height: 300, 
        width: "100%", 
        marginTop: 50 
    },
    title: { 
        color: "white", 
        textAlign: "center", 
        marginTop: 50, 
        fontSize: 20, 
        fontWeight: "bold" 
    },
    description: { 
        color: "white", 
        textAlign: "center", 
        fontSize: 14, 
        padding: 20 
    }
});

export default styles; 