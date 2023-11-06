import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from "@fortawesome/free-regular-svg-icons";

import * as Component from './styled.js';
import AnalyticCard from '../../components/dashboard_components/analytic_card/index.jsx';

function DashboardPage() {

    const cardData = [
        { title: "Analytic 1", value: "250", backgroundColor: "red" },
        { title: "Analytic 2", value: "150", backgroundColor: "green" },
        { title: "Analytic 3", value: "350", backgroundColor: "blue" },
        { title: "Analytic 4", value: "100", backgroundColor: "orange" },
        { title: "Analytic 4", value: "100", backgroundColor: "purple" },
    ]

    return (
        <Component.DashboardContainer>
            <Component.Header>
                <Component.Leading>Dashboard</Component.Leading>
                <Component.Actions>
                    <FontAwesomeIcon icon={faBell} size="xl" color='white' />
                    <Component.UserCircle>User</Component.UserCircle>
                    <p>Sebastian Schmeil</p>
                </Component.Actions>
            </Component.Header>
            <Component.ReviewContainer>
                <p>Reviews</p>
                <Component.AnalyticsRow>
                    {cardData.map((data, index) => <AnalyticCard
                        key={index}
                        title={data.title}
                        value={data.value}
                        backgroundColor={data.backgroundColor}
                    />)}
                </Component.AnalyticsRow>
            </Component.ReviewContainer>
            <Component.AnalysisContainer>
                <Component.ChartContainer>Analysis</Component.ChartContainer>
                <Component.ListContainer>Investments</Component.ListContainer>
            </Component.AnalysisContainer>
        </Component.DashboardContainer >
    );
}

export default DashboardPage;