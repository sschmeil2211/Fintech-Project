import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 25,
    },
    title: {
        color: "white",
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    option: {
        padding: 20,    
        borderWidth: 2, 
        alignItems: "center", 
        alignContent: "center",
        borderColor: "#604AD9", 
        width: 140,
        borderRadius: 5, 
        borderWidth: 2,
    }, 
    optionText: {
        color: "white",
        fontSize: 12
    }, 
    dateContainer: {
        width: '100%',
        height: 60,
        marginVertical: 35,
        width: "100%",
        borderColor: "#604AD9",
        borderRadius: 5,
        borderWidth: 2,
        paddingHorizontal: 15,
        justifyContent: "center"
    },
    date: {
        fontSize: 12,
        color: "white",
    },
    titleContainer: {
        position: 'absolute',
        top: 29, // Ajusta esta posición para superponer el texto sobre el borderBottom
        left: 15, // Ajusta esta posición para alinear el texto horizontalmente
        backgroundColor: "#000000",
        paddingHorizontal: 5,
        fontSize: 10,
        color: "#604AD9",
    }
}); 

export default styles; 