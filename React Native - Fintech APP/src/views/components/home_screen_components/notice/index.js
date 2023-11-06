import { View, Text, Image } from "react-native";

import FAIcons5 from 'react-native-vector-icons/FontAwesome5';

import styles from "./styles";

const Notice = () => {
    return (
        <View style={styles.noticeContainer}>

            <View style={styles.labelsContainer}>
                <Text style={styles.noticeLabel}>Invertí en tu futuro con dólar MEP</Text>
                <Text style={styles.buttonLabel}>
                    Invertir&nbsp;
                    <FAIcons5 name="arrow-right" size={8} />
                </Text>
            </View>

            <Image
                source={require("../../../../../assets/images/money.png")}
                style={styles.moneyImage}
            />

        </View>
    );
};

export default Notice;