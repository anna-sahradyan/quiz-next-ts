import React from 'react';
import {AnswerObject} from "@/components/quizComponent/QuizComponent";
import {Button, ButtonWrapper, Container, Div, Number, Span, Text} from "@/components/quizCard/quizCardStyled";

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({question, answers, totalQuestions, questionNr, callback, userAnswer}) => {
    return (
        <Container >
            <Div>
                <Number>Question: {questionNr} / {totalQuestions}</Number>
                <Text dangerouslySetInnerHTML={{__html: question}}/>
                <Div>
                    {answers.map((answer) => (
                        <ButtonWrapper
                            $correct={userAnswer?.correctAnswer === answer}
                            $userClicked={userAnswer?.answer === answer}
                            key={answer}
                        >
                            <Button disabled={userAnswer?true:false} value={answer} onClick={callback}

                            >
                                <Span dangerouslySetInnerHTML={{__html: answer}}
                                ></Span>
                            </Button>
                        </ButtonWrapper>
                    ))}
                </Div>
            </Div>
        </Container>
    );
};

export default QuestionCard;
