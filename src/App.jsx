import Header from './components/Header'
import Game from './components/Game'
import './styles/app.css'
import { useEffect, useState } from 'react';
import Result from './components/Result';
import ScoreTrack from './components/ScoreTrack';

function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}



function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [compChoice, setCompChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [win, setWin] = useState(0);
  const [loss, setLoss] = useState(0);
  const [ties, setTies] = useState(0);

  useEffect(() => {
    const savedWin = localStorage.getItem('win');
    const savedLoss = localStorage.getItem('loss');
    const savedTied = localStorage.getItem('tie');
    if (savedWin) setWin(Number(savedWin));
    if (savedLoss) setLoss(Number(savedLoss));
    if (savedTied) setTies(Number(savedTied));
  }, []);

  useEffect(() => {
    if (win > 0) localStorage.setItem('win', win);
  }, [win]);

  useEffect(() => {
    if (loss > 0) localStorage.setItem('loss', loss);
  }, [loss]);

  useEffect(() => {
    if (ties > 0) localStorage.setItem('tie', ties);
  }, [ties]);

  function handlePlayerChoice(choice) {
    const computer = getComputerChoice();
    setPlayerChoice(choice);
    setCompChoice(computer);
    if (choice === computer) {
      setResult('You tied!');
      setTies(prev => prev + 1);
    }
    else if ((choice === 'Rock' && computer === 'Paper') ||
      (choice === 'Paper' && computer === 'Scissors') ||
      (choice === 'Scissors' && computer === 'Rock')) {
      setResult('You Loss! Better Luck Next Time.');
      setLoss(prev => prev + 1);
    }
    else {
      setResult("You Win!!!");
      setWin(prev => prev + 1);
    }
  }

  function handleReset() {
    setPlayerChoice(null);
    setCompChoice(null);
    setResult(null);
    setWin(0);
    localStorage.removeItem('win');
    setLoss(0);
    localStorage.removeItem('loss');
    setTies(0);
    localStorage.removeItem('tie');
  }

  return (
    <div className='app-container'>
      <Header />
      <ScoreTrack
        win={win}
        loss={loss}
        ties={ties}
      />
      <Game onChoiceSelect={handlePlayerChoice} />
      <Result
        playerChoice={playerChoice}
        compChoice={compChoice}
        result={result}
      />
      <button className='reset' onClick={() => handleReset()}>Reset</button>
    </div>
  );
}



export default App
