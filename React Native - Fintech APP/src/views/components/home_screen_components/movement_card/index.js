import React from "react";
import { useState } from "react";

import { NumberDisplay, Card, CommonModal } from "../../common_components";

const MovementCard = ({
    description,
    date,
    circleType,
    amount,
    profileText,
    profileTextColor,
    movementType,
}) => {

    const MovementContent = require('../movement_content').default;
    const color = movementType === "ingress" ? "#48A76D" : "#545454";
    const moneyContainerColor = movementType === "ingress" ? "#232E20" : undefined;

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Card
            profileText={profileText}
            profileTextColor={profileTextColor}
            cardTitle={description}
            circleSize={35}
            cardDescription={date}
            circleType={circleType}
            onPress={() => setModalVisible(true)}
        >
            <NumberDisplay
                amount={amount}
                backgroundColor={moneyContainerColor}
                color={color}
                fontSize={16}
            />
            <CommonModal
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <MovementContent
                    circleType={circleType}
                    description={description}
                    profileText={profileText}
                    profileTextColor={profileTextColor}
                    amount={amount}
                    date={date}
                    movementType={movementType}
                />
            </CommonModal>
        </Card>
    );
};

export default MovementCard;  