
import {useState } from 'react';
import './App.css';
import {Cuadro} from './components/cuadro.jsx';
import{TURNS, COMBOS} from './constants/constants.js'

function App() {  

  //Tablero
  const [tablero, setTablero] = useState(()=>{
    const tableroSaved = window.localStorage.getItem('tablero')
    return tableroSaved ? JSON.parse(tableroSaved) : Array(9).fill(null) 
  })


  let [turn,setTurn] = useState(() =>
  {
    const turnSaved = window.localStorage.getItem('turn')
    return turnSaved ? JSON.parse(turnSaved): TURNS.x
  })
  const [winner, setWinner] = useState(() =>
  {
    const winnerSaved = window.localStorage.getItem('winner')
    return winnerSaved ? JSON.parse(winnerSaved): null
  })

  const checkGanador = (tablero) => {
      for(const combo of COMBOS){
        const [a,b,c] = combo
        if(
          tablero[a] &&
          tablero[a] === tablero[b] &&
          tablero[b] === tablero[c]
        ){
          return tablero[a]
        }
      }
    return null
  }
  
  const checkFull= (tablero) =>{
    return tablero.every((value) => value !== null)
  } 

  const actualizar = (index) =>
  {
    //Si ya tiene algo nada
    if(tablero[index] || winner) return

    //Jugada
    const newPlay = [...tablero]
    newPlay[index] = turn
    setTablero(newPlay)

    //Cambio de Turno
    const newTurn = (turn === TURNS.o ? turn = TURNS.x : turn = TURNS.o)
    setTurn(newTurn)    

    

    //revisar ganador
    const ganador = checkGanador(newPlay)
    if(ganador) {
      setWinner(ganador)
      window.localStorage.removeItem('tablero')
    }else if(checkFull(newPlay)){
      setWinner(false)
      window.localStorage.removeItem('tablero')
    }

    window.localStorage.setItem('tablero',JSON.stringify(newPlay))
    window.localStorage.setItem('turn',JSON.stringify(newTurn))
    window.localStorage.setItem('winner',JSON.stringify(ganador))


    
  }

  const resetGame = () => {
    setTablero(Array(9).fill(null))
    setTurn(winner === TURNS.x ? TURNS.o : TURNS.x)
    setWinner(null)

    window.localStorage.removeItem('tablero')
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {tablero.map((value ,index) =>{
          return(
            <Cuadro
              key={index}
              index ={index}
              actualizar={actualizar}
            >
              {value}
            </Cuadro>
          )
        }) }
      </section>

      <section className='turn'>
       <Cuadro isSelected ={turn === TURNS.x}>{TURNS.x}</Cuadro>
       <Cuadro isSelected ={turn === TURNS.o}>{TURNS.o}</Cuadro>

      </section>

      <section>
        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner === false
                    ? 'Draw'
                    : 'Winner:'
                  }
                </h2>
                <header className='win'>
                  {winner && <Cuadro>{winner}</Cuadro>}
                </header>
                <footer>
                  <button onClick={resetGame}>Play again</button>
                </footer>
              </div>
            </section>
          )
        }
      </section>
    </main>
  );
}

export default App;
