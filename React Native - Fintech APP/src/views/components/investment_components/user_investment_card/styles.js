import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({ 
    container:{   
        bottom: 5
    },  
    card: {  
        margin: 10,
        backgroundColor: "#604AD9",
        borderRadius: 20,
        padding: 10,
        alignItems: "center",  
        height: Dimensions.get("window"),
        width: Dimensions.get("screen").width * 0.90, 
    },
    image: {
        height: 40,
        width: 40,
        position: "absolute",
        left: 15,
        top: 15, 
    },
    percentage: { 
        position: "absolute", 
        right: 15, 
        top: 20, 
        fontSize: 18, 
        fontWeight: "bold", 
        color: "green" 
    },
    title: { 
        fontSize: 18, 
        color: "white", 
        marginTop: 20,
    },
    investmentAnalysis: { 
        flexDirection: "row",  
    },
    investmentCard: { 
        backgroundColor: "#252525", 
        borderRadius: 10, 
        padding: 10, 
        width: 170, 
        alignItems: "center", 
        margin: 10 
    },
    cardTitle: { 
        color: "white", 
        marginBottom: 10 
    },
    cardValue: { 
        color: "white", 
        fontSize: 18, 
        fontWeight: "600" 
    },
    buttonsRow: {
        flexDirection: "row"
    },
    button: { 
        backgroundColor: "#252525", 
        color: "white", 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        margin: 10, 
        borderRadius: 10 
    }
});

export default styles; 