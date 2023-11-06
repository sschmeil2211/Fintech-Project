import styled from 'styled-components';

export const DashboardContainer = styled.div`
  background-color: #0C0F16;
  min-block-size: 100vh; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  background-color: #151B26;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Leading = styled.div`
  flex: 7;
  font-size: 25px;
  font-weight: bold
`;

export const Actions = styled.div`
  flex-direction: row;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center
`;

export const UserCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #312D40;
`; 

export const ReviewContainer = styled.div`     
  background: #151B26;
  color: white;
  padding: 16px;
  margin: 16px;
  border-radius: 15px !important;
  flex: 1;
`;

export const AnalyticsRow = styled.div`  
  background: #151B26;
  color: white; 
  border-radius: 15px !important;
  flex: 1;
  display: flex; 
`;

export const AnalysisContainer = styled.div`
  display: flex; 
  color: white; 
  border-radius: 15px !important;
  flex: 1; 
`;

export const BodyContainer = styled.div`
  background: #151B26; 
  border-radius: 15px !important;
  padding: 16px;
  margin: 16px;
`;

export const ChartContainer = styled(BodyContainer)` 
  flex: 2; 
`;

export const ListContainer = styled(BodyContainer)` 
  flex: 1; 
`;