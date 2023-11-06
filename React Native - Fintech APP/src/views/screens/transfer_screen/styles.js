import { StyleSheet } from "react-native";

const styles = StyleSheet.create({  
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        marginHorizontal: 5
    },
    container: {
        flexDirection: "column",
        marginHorizontal: 5
    },
    title: {
        color: "white",
        fontSize: 12
    }, 
    contactContainer: {
        marginTop: 10
    },
    banksContainer: { 
        paddingHorizontal: 15 
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