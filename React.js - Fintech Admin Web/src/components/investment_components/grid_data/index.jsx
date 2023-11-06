import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import * as Component from './styled.js';
import { Grid } from '@mui/material';
import ModalForm from '../../common_components/modal_form/index.jsx';

import CRYPTO from "../../../assets/investment_icons/CRYPTO.png";
import FOREIGN_EXCHANGE from "../../../assets/investment_icons/FOREIGN_EXCHANGE.png";
import SHARES_OF_STOCK from "../../../assets/investment_icons/SHARES_OF_STOCK.png";
import ESTATE from "../../../assets/investment_icons/ESTATE.png";

function GridData({
    data,
    index,
    selectedInvestments,
    setSelectedInvestments,
    onDelete
}) {
    const [expandedItems, setExpandedItems] = useState({}); // Cambia aquí 
    const [modalVisible, setModalVisible] = useState(false);

    const toggleExpand = (index) => setExpandedItems((prevState) => ({ ...prevState, [index]: !prevState[index] }));

    const CheckBox = () => (
        <label>
            <input
                type="checkbox"
                checked={selectedInvestments.includes(data.id)}
                onChange={() => {
                    if (!selectedInvestments.includes(data.id))
                        setSelectedInvestments([...selectedInvestments, data.id]);
                    else
                        setSelectedInvestments(selectedInvestments.filter(id => id !== data.id));
                }}
            />
        </label>
    );

    const IconButton = ({ icon, onClick }) => (
        <Component.ActionButton onClick={onClick} >
            <FontAwesomeIcon icon={icon} size="xs" color='white' />
        </Component.ActionButton>
    );

    const iconType = (type) => {
        switch (type) {
            case "CRYPTO":
                return CRYPTO;
            case "FOREIGN_EXCHANGE":
                return FOREIGN_EXCHANGE;
            case "SHARES_OF_STOCK":
                return SHARES_OF_STOCK;
            case "ESTATE":
                return ESTATE;
            default:
                return null;
        };
    };

    return (
        <Component.InvestmentContainer
            key={index}
            onClick={modalVisible ? null : () => toggleExpand(index)}
            expanded={expandedItems[index]}
        >
            <Grid container spacing={1} columns={12} alignItems={"center"}>
                <Grid item xs={1}><CheckBox /></Grid>
                <Grid item xs={2}>
                    <img src={iconType(data.type)} height={40} />
                </Grid>
                <Grid item xs={1}>{data.id}</Grid>
                <Grid item xs={2}>{data.name}</Grid>
                <Grid item xs={1}>{data.efficiency}</Grid>
                <Grid item xs={1}>{data.risk}</Grid>
                <Grid item xs={2}>$ {data.initialBalance}</Grid>
                <Grid item xs={1}>
                    <IconButton icon={faTrashAlt} onClick={() => onDelete(data.id)} />
                </Grid>
                <Grid item xs={1}>
                    <IconButton icon={faEdit} onClick={() => setModalVisible(true)} />
                </Grid>
            </Grid>
            {expandedItems[index] && <Component.Description>{data.description}</Component.Description>}
            <ModalForm
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                data={data}
            />
        </Component.InvestmentContainer>
    );
}

export default GridData;