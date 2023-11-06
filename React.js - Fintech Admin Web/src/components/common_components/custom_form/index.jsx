import React from 'react';

import { MenuItem, TextField } from '@mui/material';

export function CustomTextInput({
    data, 
    menuItems,
    onChange
}) {
    const fieldStyle = { background: "#1F313D" };
    const inputLabelStyle = {
        style: { color: "white" }
    };
    const inputStyle = {
        style: { color: "white", margin: "10px 0px 10px 0px" }
    };
    const selectStyle = {
        style: {
            background: "transparent",
            color: "white",
            padding: "10px 0px 10px 0px",
        }
    };

    return (
        <TextField
            name={data.name}
            label={data.label}
            type={"text"}
            value={data.value}
            onChange={onChange}
            select={data.select}
            fullWidth
            margin="dense"
            variant='filled'
            multiline={data.multiline}
            rows={3}
            InputLabelProps={inputLabelStyle}
            inputProps={inputStyle}
            style={fieldStyle}
            SelectProps={selectStyle}
        >
            {menuItems.map((item, index) =>
                <MenuItem key={index} value={item}>{item}</MenuItem>
            )}
        </TextField>
    );
}

export function CustomNumberInput({
    data, 
    onChange
}) {
    const fieldStyle = { background: "#1F313D" };
    const inputLabelStyle = {
        style: { color: "white" }
    };
    const inputStyle = {
        style: { color: "white", margin: "10px 0px 10px 0px" }
    }; 

    return (
        <TextField
            name={data.name}
            label={data.label}
            type={"number"}
            value={data.value}
            onChange={onChange}
            fullWidth
            margin="dense"
            variant='filled' 
            InputLabelProps={inputLabelStyle}
            inputProps={inputStyle}
            style={fieldStyle} 
        />
    );
} 