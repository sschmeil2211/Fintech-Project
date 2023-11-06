import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#252525",
        paddingBottom: 20, 
        paddingHorizontal: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    topContainer: {
        height: 10,
        width: "100%",
        alignItems: "center",
        padding: 10
    },
    box: {
        backgroundColor: "#191919",
        height: 6,
        width: 40,
        borderRadius: 50, 
    }
});

export default styles;  