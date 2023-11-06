import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #0C0F16;
  min-block-size: 100vh; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.div`
  background: #151B26;
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
  background: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #312D40;
`;

export const ButtonsRow = styled.div`
  display: flex
`;

export const InvestmentContainer = styled.div`   
    background: #151B26; 
    color: white;
    padding: 16px;
    margin: 16px;
    border-radius: 15px;   
    ${({ expanded }) => expanded && css` 
            background: #1A2433; 
            border: 2px solid #FFFFFF30;
        `}
`;