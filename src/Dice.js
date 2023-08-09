import React from 'react'


export default function Dice(props){
    const dieStyle ={
        backgroundColor : props.isHeld ? "#59E391" : "white"
    }
    return(
        <div className='die-style' style={dieStyle} onClick={props.holdDice}>       
            <h2 className='die-num'>{props.value}</h2>
        </div>
    )
}