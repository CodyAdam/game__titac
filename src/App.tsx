import React from 'react';
import { Board } from './features/board/Board';
import { Score } from './features/board/Score';
import { Banner } from './features/banner/Banner';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Banner />
      <div className='container'>
        <Score player={1} />
        <Board />
        <Score player={2} />
      </div>
    </div>
  );
}

export default App;
