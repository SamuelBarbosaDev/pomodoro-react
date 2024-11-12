import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Timer } from './timer';
import { Button } from './button';

interface Props {
    defaultPomodoroTime: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
    const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTime);

    useInterval(() => {
        setMainTime(mainTime - 1);
    }, 1000);
    return (
        <main>
            <h2>You are: working</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button
                    text="Work"
                    onClick={() => console.log('Work...')}
                ></Button>
            </div>
        </main>
    );
}
