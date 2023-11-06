import React, { useState } from "react"; 
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { DropdownSelect } from "../../common_components";
import styles from "./styles";

const TransferDetails = ({
    reason,
    setReason,
    onPressRequest,
    onPressSend,
    message,
    setMessage
}) => {

    const [dropdownExpansions, setDropdownExpansions] = useState(false);
    const reasons = [
        "Opcion 1",
        "Opcion 2",
        "Opcion 3",
        "Opcion 4",
        "Opcion 5",
        "Opcion 6",
        "Opcion 7",
        "Opcion 8",
        "Opcion 9",
        "Varias"
    ];

    const sendButtonStyles = { ...styles.button, backgroundColor: "white" }
    const sendButtonTextStyles = { ...styles.buttonText, color: "#604AD9" }

    return (
        <>
            <DropdownSelect
                options={reasons}
                backgroundColor={"#191919"}
                borderRadius={20}
                paddingVertical={11}
                selectedOption={reason}
                setSelectedOption={setReason}
                expanded={dropdownExpansions} // Usar el estado específico para este dropdown
                setExpanded={(value) => setDropdownExpansions(value)}

            />
            <TextInput
                placeholder="Mensaje"
                placeholderTextColor={"white"}
                onChangeText={setMessage}
                value={message}
                style={styles.textInput}
            />
            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={onPressRequest}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>SOLICITAR</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressSend}>
                    <View style={sendButtonStyles}>
                        <Text style={sendButtonTextStyles}>ENVIAR</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default TransferDetails;