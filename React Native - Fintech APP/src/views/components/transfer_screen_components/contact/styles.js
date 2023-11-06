import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        marginHorizontal: 5,
        marginVertical: 10,
        justifyContent: "space-between",
        alignItems: "center" 
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",  
        width: "80%",     
    }, 
    userInfo: {
        paddingHorizontal: 10,
    },
    name: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12
    },
    bank: {
        color: "white",
        fontSize: 11
    }
});

export default styles; 