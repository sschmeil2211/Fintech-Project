import React from 'react';

import * as Component from './styled.js';

function AnalyticCard({
    title,
    value,
    backgroundColor 
}) {
    return (
        <Component.Card backgroundColor={backgroundColor}> 
            <Component.CardTitle>{title}</Component.CardTitle>
            <Component.CarDetails>
                <Component.Line/>
                <Component.Number>{value}</Component.Number>
            </Component.CarDetails>
        </Component.Card>
    );
}

export default AnalyticCard;