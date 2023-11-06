import React from "react";
import { View, Text } from "react-native";

import { CircleDisplay, NumberDisplay, ProfileOrIconDisplay } from "../../common_components";
import { MovementModalButton } from "..";
import styles from "./styles";

const MovementContent = ({
    profileText,
    profileTextColor,
    circleType,
    amount,
    description,
    date,
    movementType
}) => {

    const color = movementType === "ingress" ? "#48A76D" : "#545454";
    const moneyContainerColor = movementType === "ingress" ? "#232E20" : undefined;

    const renderButtons = () => {
        if (circleType === "profile")
            return (
                <>
                    <MovementModalButton icon="exchange-alt" label="Transferir al contacto" />
                    <MovementModalButton icon="search" label="Ver historial" />
                    <MovementModalButton icon="file" label="Transferir al contacto" />
                    <MovementModalButton icon="folder" label="Otros" />
                </>
            );
        else
            return <MovementModalButton icon="file" label="Ver detalle" />;
    };

    return (
        <>
            <View style={styles.dataColumn}>

                <View style={styles.container}>
                    <CircleDisplay
                        profileText={profileText}
                        profileTextColor={profileTextColor} 
                        fontSize={26}
                        circleType={circleType}
                        size={70}
                    />
                </View>

                <NumberDisplay
                    amount={amount}
                    backgroundColor={moneyContainerColor}
                    color={color}
                    fontSize={22}
                />

                <Text style={styles.movementType}>{description}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>

            {renderButtons()}
        </>
    );
};

export default MovementContent;  