import React from "react";
import { View, TouchableOpacity, Modal } from "react-native";

import FAIcons5 from "react-native-vector-icons/FontAwesome5";

import styles from "./styles";

const CommonModal = ({
    visible, 
    onRequestClose,
    children
}) => {

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.topContainer}>
                        <View style={styles.box} />
                    </View>
                    <TouchableOpacity onPress={onRequestClose}>
                        <FAIcons5 name={"times-circle"} size={22} color={"white"} />
                    </TouchableOpacity>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default CommonModal;  