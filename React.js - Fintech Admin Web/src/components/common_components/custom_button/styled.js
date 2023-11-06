import styled from 'styled-components';

export const Button = styled.button`
    border: none;
    display: flex;
    padding: 0.75rem 1.5rem;
    background-color: ${(props) => props.buttonColor};
    color: white;
    margin: 18px;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    vertical-align: middle;
    align-items: center;
    border-radius: 0.5rem;
    user-select: none;
    gap: 0.75rem;
    box-shadow: 0 4px 6px -1px #488aec31, 0 2px 4px -1px #488aec17;
    transition: all .4s ease; 
    &:active {
        opacity: 0.2;
        box-shadow: none;
    }  
`; 