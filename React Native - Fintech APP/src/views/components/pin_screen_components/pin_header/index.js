import React from 'react';
import { useState } from 'react';
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import Header from "../../common_components/header";
import Popup from '../../common_components/popup';

const PinHeader = ({ onPressForgotPassword }) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Header
                backgroundColor={"#393041"}
                iconName={"times-circle"}
                iconColor={"white"}
                onPress={() => setModalVisible(true)}
            >
                <TouchableOpacity onPress={onPressForgotPassword}>
                    <Text style={styles.headerText}>Olvidé mi clave</Text>
                </TouchableOpacity>
            </Header>
            <Popup
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            />
        </>
    );
};

export default PinHeader;