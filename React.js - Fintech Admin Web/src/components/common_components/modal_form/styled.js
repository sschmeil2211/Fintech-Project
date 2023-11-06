import { TextField, Button } from '@mui/material';
import styled from 'styled-components';

export const Form = styled.form` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 2em;
    background: #151B26; 
    margin: 5em;
    border-radius: 25px;
`;

/* transition: .4s ease-in-out;
&:hover {
    transform: scale(1.05);
    border: 1px solid black;
}  */

export const Title = styled.p`
    text-align: center;
    margin: 0em 0em 2em 0em;
    color: white;
    font-size: 1.2em;
`;  

export const ButtonsContainer = styled.div`
    display: flex; 
    width: 100%; 
    margin: 30px 0px 0px 0px;
`;

export const StyledButton = styled(Button)`
    background: #1F213D; 
    color: white; 
    flex: 1; 
    margin: 0px 20px;
`;

export const InputsNumberRow = styled.div`
    display: flex;
    width: 100%
`;

export const InputContainer = styled.div`
    margin: 0px 10px; 
    flex: 1;
`;

export const ColumnInputNumber = styled.div`
    flex: 1;
`;