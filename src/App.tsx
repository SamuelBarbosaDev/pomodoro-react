import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer'


function App(): JSX.Element {
    return (
        <main>
            <section className='main-container'>
                <h1>Pomodoro</h1>
                <PomodoroTimer PomodoroTime={1500}
                shortRestTime={300}
                longRestTime={900}
                cycles={4}/>
            </section>
        </main>
    );
}

export default App;
