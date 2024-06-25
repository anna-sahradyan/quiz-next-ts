'use client';
import React, { useState, useEffect } from "react";
import { Difficulty, fetchQuizQuestions, QuestionsState } from "@/components/dataApi/Api";
import QuestionCard from "@/components/quizCard/QuestionCard";
import {
    BtnNext,
    BtnStart,
    Container,
    Loading,
    QuestionBoxCard,
    QuizBox,
    Score,
    Title,
    TotalTime
} from "@/components/quizComponent/quizStyled";
import Timer from "@/components/timer/Timer";

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;
const QUESTION_DURATION = 30;

const QuizComponent: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<QuestionsState[]>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState(0);
    const [finishQuiz, setFinishQuiz] = useState(true);
    const [questionDuration, setQuestionDuration] = useState(QUESTION_DURATION);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [totalTime, setTotalTime] = useState(0);

    useEffect(() => {
        if (!finishQuiz && startTime === null) {
            setStartTime(Date.now());
        }
        if (finishQuiz && startTime !== null) {
            setTotalTime(Math.floor((Date.now() - startTime) / 1000));
        }
    }, [finishQuiz, startTime]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!finishQuiz && startTime !== null) {
            timer = setInterval(() => {
                setTotalTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [finishQuiz, startTime]);

    const triviaData = async () => {
        setLoading(true);
        setFinishQuiz(false);
        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
        setQuestionDuration(QUESTION_DURATION);
        setStartTime(Date.now());
        setTotalTime(0);
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!finishQuiz) {
            const answer = e.currentTarget.value;
            const correct = questions[number].correct_answer === answer;
            if (correct) {
                setScore((prev) => prev + 1);
            }
            const answerObj: AnswerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers((prev) => [...prev, answerObj]);
        }
    }

    const nextQuestion = () => {
        const nextQuestion = number + 1;
        if (nextQuestion === TOTAL_QUESTIONS) {
            setFinishQuiz(true);
        } else {
            setNumber(nextQuestion);
            setQuestionDuration(QUESTION_DURATION);
        }
    }

    const handleTimeUp = () => {
        if (!finishQuiz) {
            setUserAnswers((prev) => [
                ...prev,
                {
                    question: questions[number].question,
                    answer: "No Answer",
                    correct: false,
                    correctAnswer: questions[number].correct_answer,
                },
            ]);
            nextQuestion();
        }
    }

    return (
        <Container>
            <Title>quizzy</Title>
            <QuizBox>
                <Score>Score: {score}</Score>
                <TotalTime>Total Time: {totalTime}</TotalTime>
                {finishQuiz ? (
                    <BtnStart onClick={triviaData}>Start Again</BtnStart>
                ) : (
                    <>
                        {loading && <Loading>Loading Questions ...</Loading>}
                        {!loading && (
                            <QuestionBoxCard>
                                <Timer duration={questionDuration} onTimeUp={handleTimeUp} />
                                <QuestionCard
                                    questionNr={number + 1}
                                    totalQuestions={TOTAL_QUESTIONS}
                                    question={questions[number].question}
                                    answers={questions[number].answers}
                                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                                    callback={checkAnswer}
                                />
                            </QuestionBoxCard>
                        )}
                        {!loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
                            <BtnNext onClick={nextQuestion}>Next Question</BtnNext>
                        )}
                        {!loading && userAnswers.length === TOTAL_QUESTIONS && (
                            <BtnNext onClick={() => setFinishQuiz(true)}>Show Results</BtnNext>
                        )}
                    </>
                )}
            </QuizBox>
        </Container>
    );
}

export default QuizComponent;
