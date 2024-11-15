import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Timer } from './timer';
import { Button } from './button';
import { secondsToTime } from '../utils/seconds-to-time';

const bellStart = require('../sounds/bell-start.mp3');
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
    PomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = React.useState(props.PomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(
        new Array(props.cycles - 1).fill(true),
    );
    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if (working) setFullWorkingTime(fullWorkingTime + 1);
        },
        timeCounting ? 1000 : null,
    );

    const configureWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.PomodoroTime);
        audioStartWorking.play();
    }, [
        setTimeCounting,
        setWorking,
        setResting,
        setMainTime,
        props.PomodoroTime,
    ]);

    const configureRest = useCallback(
        (long: boolean) => {
            setTimeCounting(true);
            setWorking(false);
            setResting(true);

            if (long) {
                setMainTime(props.longRestTime);
            } else {
                setMainTime(props.shortRestTime);
            }

            audioStopWorking.play();
        },
        [
            setTimeCounting,
            setWorking,
            setResting,
            setMainTime,
            props.longRestTime,
            props.shortRestTime,
        ],
    );

    useEffect(() => {
        const main = document.getElementsByTagName('main')[0]
        if (working) main.classList.add('working');
        if (resting) main.classList.remove('working');
        if (mainTime > 0) return;
        if (working && cyclesQtdManager.length > 0) {
            configureRest(false);
            cyclesQtdManager.pop();
        } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(true);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork();
    }, [
        working,
        resting,
        mainTime,
        cyclesQtdManager,
        numberOfPomodoros,
        completedCycles,
        configureRest,
        setCyclesQtdManager,
        configureWork,
        props.cycles,
    ]);

    return (
        <div className='pomodoro'>
            <h2>Você está: {working ? 'Trabalhando' : 'Descansado'}</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button
                    text="Work"
                    onClick={() => configureWork()}
                ></Button>
                <Button
                    text="Rest"
                    onClick={() => configureRest(false)}
                ></Button>
                <Button
                    text={timeCounting ? 'Pause' : 'Play'}
                    onClick={() => setTimeCounting(!timeCounting)}
                    className={!working && !resting ? 'hidden' : ''}

                ></Button>
            </div>
            <div className='details'>
                <p>Ciclos concluídos: {completedCycles}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros Concluídos: {numberOfPomodoros}</p>
            </div>
        </div>
    );
}
