import { StyleSheet } from "react-native";
1
const styles = StyleSheet.create({   
    inputContainer: { 
        flexDirection: "row" 
    },
    buttonSearch: {
        position: "absolute", 
        right: 1,  
        top: 35,
        color: "white", 
        borderRadius: 5,
        backgroundColor: "#604AD9",
        paddingHorizontal: 20,
        paddingVertical: 20, 
    }
});

export default styles; 