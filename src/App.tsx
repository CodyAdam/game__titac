import React from 'react';
import { Counter } from './features/counter/Counter';
import { Board } from './features/board/Board';
import { Score } from './features/board/Score';
import './App.css';

function App() {
    return (
        <div className='App'>
            <Score player={1} />
            <Board />
            <Score player={2} />
        </div>
    );
}

export default App;
