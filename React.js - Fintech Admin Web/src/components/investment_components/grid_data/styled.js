import { IconButton } from '@mui/material';
import styled, { css } from 'styled-components';

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

export const Description = styled.p`
  margin: 30px;
  adding: 50px 20px
`;  

export const ActionButton = styled(IconButton)`
  color: white, 
`;