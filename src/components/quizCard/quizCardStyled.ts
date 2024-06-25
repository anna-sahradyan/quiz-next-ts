import styled, { DefaultTheme } from 'styled-components';

type ButtonWrapperProps = {
    $correct?: boolean;
    $userClicked?: boolean;
}
export const Container = styled.div`
    margin-top: 20px;
`;
export const Div = styled.div` 

`;
export const Number = styled.p`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin-bottom: 10px;
    font-size: 18px;
`;
export const Text = styled.p`
    width: 80%;
    margin: auto auto 10px auto;
    padding: 5px;
    text-align: center;
    font-size: 16px;
    font-weight: 300;
`;
const getButtonBackground = ({ $correct, $userClicked, theme }: ButtonWrapperProps & { theme: DefaultTheme }) => {
    if ($correct) {
        return 'linear-gradient(90deg, #56FFA4, #59BC86)';
    } else if ($userClicked) {
        return 'linear-gradient(90deg, #FF5656, #C16868)';
    } else {
        return 'linear-gradient(90deg, #56ccff, #6eafb4)';
    }
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    margin: auto;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    flex-direction: column;
    width: 80%;
    :hover {
        opacity: 0.8;
    }

    button {
        cursor: pointer;
        user-select: none;
        font-size: 0.8rem;
        width: 100%;
        height: 40px;
        margin: 5px 0;
        background: ${getButtonBackground};
        border: 3px solid #ffffff;
        box-shadow: 1px 2px 0 rgba(0, 0, 0, 0.1);
        border-radius: 30px;
        color: #fff;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    }
`;
export const Span = styled.span` 

`;
export const Button = styled.button` 

`;
