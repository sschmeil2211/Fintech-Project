import React, { useState } from 'react';

import { Modal } from '@mui/material';

import * as Component from './styled.js';
import { CustomTextInput, CustomNumberInput } from '../custom_form/index.jsx';

function ModalForm({
    visible,
    onClose,
    onSaveForm,
    data
}) {
    const [formData, setFormData] = useState(data);

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSave = () => {
        onSaveForm(formData);
        onClose();
    };

    const textFields = [
        { name: "type", label: "Type", value: formData.type, select: true },
        { name: "name", label: "Name", value: formData.name, select: false },
        { name: "description", label: "Description", value: formData.description, multiline: true, select: false },
    ];

    const firstNumberColumn = [
        { name: "expectedEfficiency", label: "Expected Efficiency", value: formData.expectedEfficiency },
        { name: "errorRange", label: "Error Range", value: formData.errorRange }, 
    ];
    
    const secondNumberColumn = [ 
        { name: "fluctuations", label: "Fluctuations", value: formData.fluctuations },
        { name: "randomizer", label: "Randomizer", value: formData.randomizer }, 
    ];

    const balance = { name: "initialBalance", label: "Initial Balance", value: formData.initialBalance }

    const items = ["CRYPTO", "FOREIGN_EXCHANGE", "SHARES_OF_STOCK", "ESTATE"];

    return (
        <Modal open={visible} onClose={onClose} >
            <Component.Form>
                <Component.Title>Edit Investment</Component.Title>
                {textFields.map((field, index) =>
                    <CustomTextInput
                        key={index}
                        data={field}
                        onChange={onChange}
                        menuItems={items}
                    />
                )}
                <Component.InputsNumberRow>
                    <Component.ColumnInputNumber>
                        {firstNumberColumn.map((field, index) =>
                            <Component.InputContainer>
                                <CustomNumberInput
                                    key={index}
                                    data={field}
                                    onChange={onChange}
                                />
                            </Component.InputContainer>
                        )}
                    </Component.ColumnInputNumber>
                    <Component.ColumnInputNumber>
                        {secondNumberColumn.map((field, index) =>
                            <Component.InputContainer>
                                <CustomNumberInput
                                    key={index}
                                    data={field}
                                    onChange={onChange}
                                />
                            </Component.InputContainer>
                        )}
                    </Component.ColumnInputNumber>
                </Component.InputsNumberRow>
                <CustomNumberInput
                    data={balance}
                    onChange={onChange}
                />
                <Component.ButtonsContainer >
                    <Component.StyledButton onClick={onClose}>Cancel</Component.StyledButton>
                    <Component.StyledButton onClick={onSave}>Save</Component.StyledButton>
                </Component.ButtonsContainer>
            </Component.Form>
        </Modal>
    );
}

export default ModalForm;