import React from 'react'
import Draggable from 'react-draggable';

export default function Censor(props) {
  return (
    <Draggable bounds="parent" onStop={props.handleCensorMove}>
      <p id={props.id} className="censor-box">
        {props.id}
      </p>
    </Draggable>
  )
}
