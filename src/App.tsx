import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer'


function App(): JSX.Element {
    return (
        <main>
            <h1>Hollo world.!!!</h1>
            <PomodoroTimer defaultPomodoroTime={1500}/>
        </main>
    );
}

export default App;
