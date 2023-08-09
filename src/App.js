
import { nanoid } from "nanoid"
import React from "react"
import Confetti from "react-confetti"
import './App.css'
import Dice from "./Dice"


export default function App() {
  
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
    
  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
          console.log("You won!")
      }
  }, [dice])
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
}
    
  function allNewDice() {
      const newDice = []
      for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
  }

  function handleChange(){
    if(!tenzies){setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? 
          die :
          generateNewDie()
          
         }))
}else{
  setTenzies(false)
  setDice(allNewDice())
}
   }
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} :
          die
  }))
  }

  const diceElements = dice.map(die => <Dice value={die.value} key={die.id} isHeld={die.isHeld}  holdDice={() => holdDice(die.id)} />)
    return (
        <main>
            {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
           <div className='dice-container'>
           {diceElements}
           </div>
          <button className="roll-btn" onClick={handleChange}>{tenzies ? "New Game" : "Roll"}</button>
          
        </main>
        
    )
}