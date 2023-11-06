import styled from 'styled-components';

export const Card = styled.div`   
  background-color: ${(props) => props.backgroundColor}; 
  padding: 0px 35px 0px 35px; 
  margin: 16px;  
  border-radius: 15px !important;
  flex: 1;
  box-shadow: 15px 15px 30px rgb(25, 25, 25), -15px -15px 30px rgb(60, 60, 60);
`;

export const CardTitle = styled.p`
  color: black;
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px
`;

export const CarDetails = styled.div`
  display: flex; 
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const Line = styled.div`
  height: 25px;
  background-color: black;
  width: 5px;
  border-radius: 5px !important;
`;

export const Number = styled.p`
  font-size: 60px; 
  color: black;
  font-weight: 500;
  margin: 10px;
`;