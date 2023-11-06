import React from "react";
import { View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import styles from "./styles";
import { getInitialsName } from "../../../../utils/utils";

const keyExtractor = (_, index) => index.toString();

const MoneyMovements = ({ userData }) => {

    const movements = userData;//userData.movements

    const renderMovementCard = ({ item, index }) => {
        const MovementCard = require('../movement_card').default; 
        const circleType = item.cardType === "userMovement" ? "profile" : item.cardType === "appMovement" ? "icon" : null
        return (
            <MovementCard
                circleType={"profile"/* circleType */}
                profileText={getInitialsName(item.userName/* item.description */)}
                profileTextColor={item.userColor/* item.user_color */}
                description={item.userName/* item.description */}
                date={item.date}
                amount={item.amount}
                movementType={item.transferType}
                key={index}
            />
        )
    };

    return (
        <View style={styles.movementsContainer}>
            <Text style={styles.textStyle}>Movements</Text>
            {movements?.length > 0 ? (
                <FlatList
                    data={movements}
                    renderItem={renderMovementCard}
                    keyExtractor={keyExtractor}
                />
            ) : (
                <View style={styles.voidMovementsContainer}>
                    <Icon name="folder-open" color="#4A494F" size={100} />
                    <Text style={styles.voidMovementsText}>No movements found</Text>
                </View>
            )}
        </View>
    );
}

export default React.memo(MoneyMovements); 