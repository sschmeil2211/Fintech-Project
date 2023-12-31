import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ItemsList,
    ItemContainer,
    ItemWrapper,
    ItemName,
} from "./styled";
import { dummyData } from "../.."; 

const Items = ({ displaySidebar }) => {
    const [activeItem, setActiveItem] = useState(0);

    return (
        <ItemsList>
            {dummyData.map((itemData, index) => (
                <ItemContainer
                    key={index}
                    onClick={() => setActiveItem(itemData.id)}
                    /* Adding active class when the user clicks */
                    className={itemData.id === activeItem ? "active" : ""}
                >
                    <Link to={itemData.path}>
                        <ItemWrapper>
                            {itemData.icon}
                            <ItemName displaySidebar={displaySidebar}>
                                {itemData.name}
                            </ItemName>
                        </ItemWrapper>
                    </Link>
                </ItemContainer>
            ))}
        </ItemsList>
    );
};

export default Items;