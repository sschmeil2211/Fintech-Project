import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

import * as Component from './styled.js';

function CustomButton({
    buttonLabel,
    buttonColor,
    buttonIcon,
    iconColor,
    onClick,
}) {

    return (
        <Component.Button onClick={onClick} buttonColor={buttonColor}>
            <FontAwesomeIcon icon={buttonIcon} size="xl" color={iconColor} />
            <p>{buttonLabel}</p>
        </Component.Button>
    );
}

export default CustomButton;