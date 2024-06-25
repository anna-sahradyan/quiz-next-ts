'use client';
import React, { useState, useEffect, useRef } from 'react';
import {TotalTime} from "@/components/quizComponent/quizStyled";

type TimerProps = {
    duration: number;
    onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
    const [time, setTime] = useState(duration);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (time <= 0) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            onTimeUp();
        }
    }, [time, onTimeUp]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <>
            <TotalTime>Time Remaining: {formatTime(time)}</TotalTime>
        </>
    );
};

export default Timer;
