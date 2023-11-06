import React from 'react'; 
import { View, Text, TouchableOpacity, Modal } from "react-native"; 

import styles from "./styles";

const Popup = ({ 
    visible, 
    onRequestClose
}) => { 

    const cancelTextStyle = { ...styles.buttonText, color: "white" }
    const unbindTextStyle = { ...styles.buttonText, color: "#604AD9" }

    return ( 
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <Text style={styles.modalTitle}>¿Deseas desvincular el dispositivo?</Text>
                    <Text style={styles.modalText}>Este dispositivo está vinculado a una cuenta. Al continuar se desvinculará y tendrás que vincularlos de nuevo</Text>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={onRequestClose}>
                            <Text style={cancelTextStyle}>CANCELAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onRequestClose}>
                            <Text style={unbindTextStyle}>DESVINCUALR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Popup;