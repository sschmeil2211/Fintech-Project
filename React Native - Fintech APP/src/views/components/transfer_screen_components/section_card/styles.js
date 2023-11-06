import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        marginHorizontal: 5,
        marginVertical: 10,
        justifyContent: "space-between",
        alignItems: "center",
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    userInfo: {
        paddingHorizontal: 10
    },
    name: {
        color: "white", 
        fontSize: 12
    },
    description: {
        color: "grey",
        fontSize: 10, 
    }, 
});

export default styles; 