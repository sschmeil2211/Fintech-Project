import { View, Text, TouchableOpacity } from "react-native";

import FAIcons5 from 'react-native-vector-icons/FontAwesome5';

import styles from "./styles";

const MovementButton = ({ icon, text, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.iconColumn}>
                <View style={styles.iconBox}>
                    <FAIcons5 name={icon} size={26} color={'white'} />
                </View>
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MovementButton;