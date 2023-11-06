import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    input: { 
        fontSize: 12,
        width: "100%",
        borderColor: "#604AD9",
        height: 60,
        marginVertical: 15, 
        borderRadius: 5,
        borderWidth: 2, 
        paddingHorizontal: 15,
        color: "white"
    }, 
    container: { 
        position: 'relative',
        width: '100%',
        height: 50,
        borderBottomWidth: 1,  
        marginVertical: 20
    }, 
    overlayText: {
        position: 'absolute',
        top: 10, // Ajusta esta posición para superponer el texto sobre el borderBottom
        left: 15, // Ajusta esta posición para alinear el texto horizontalmente
        paddingHorizontal: 5,
        fontSize: 10,
        color: "#604AD9",
    },
});

export default styles; 