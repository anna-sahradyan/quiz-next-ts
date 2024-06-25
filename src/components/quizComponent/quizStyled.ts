import styled from 'styled-components';
export const Container = styled.div`
    margin-top: 20px;
`;
export const QuestionBoxCard = styled.div`
    width: 100%;
    margin: auto;
`;

export const Title = styled.h1`
    display: flex;
    justify-content: center;
    font-weight: 300;
    font-size: 68px;
    text-transform: uppercase;
    filter: drop-shadow(3px 3px 10px var(--dropShadow));
`;
export const QuizBox = styled.div`
    width: 80%;
    margin: 30px auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px 0 20px 0;
    align-items: center;
    box-shadow:3px 3px 10px var(--dropShadow) ;
`;
export const TotalTime = styled.p`
    display: flex;
    justify-content: center;
    font-size: 18px;
    text-align: center;

`;
export const Score = styled.p`
    display: flex;
    justify-content: center;
    font-size: 18px;
    text-align: center;
`;
export const BtnNext = styled.button`
    outline: none;
    border-radius: 30px;
    padding: 5px;
    color: #0f172a;
    font-weight: 300;
    font-size: 16px;
    text-transform: uppercase;
    width: 80%;
    border: 2px solid var(--dropShadow); 
`;
export const BtnStart = styled.button`
    outline: none;
    border-radius: 30px;
    padding: 5px;
    color: #0f172a;
    font-weight: 300;
    font-size: 16px;
    text-transform: uppercase;
    width: 80%;
    border: 2px solid var(--dropShadow);
`;

export const Loading = styled.p`
    display: flex;
    justify-content: center;
    font-size: 18px;
    text-align: center;
`;
