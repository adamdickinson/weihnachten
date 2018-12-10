import ArrowRightThickIcon from "mdi-react/ArrowRightThickIcon"
import CardsHeartIcon from "mdi-react/CardsHeartIcon"
import colors from "material-colors-object"

import React, { useState } from "react"
import styled from "styled-components"

import FadeIn from "./FadeIn"



const Completion = styled.div`
  align-items: center;
  background: ${colors.green.shades.a700.value};
  color: #FFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  width: 100%;

  button {
    font-weight: bold;
    font: inherit;
    left: 50%;
    position: absolute;
    text-transform: uppercase;
    top: 75%;
    width: 64px;
    height: 64px;
    margin-left: -32px;
  }

  input {
    font-size: 2em;
    color: inherit;
    border: 0 solid currentColor;
    border-bottom-width: 2px;
    background: none;
    max-width: 8em;
    outline: none;
    font-family: inherit;
    text-transform: inherit;
    text-align: center;
    margin: 1em 0;
  }

`

const screens = [
  { render: ({ name }, s) => <FadeIn key={s}><strong>Nice one {name}!</strong></FadeIn>, },
  { render: ({ charity: { whatItDoes } }, s) => <FadeIn key={s}>This Christmas, you've decided to <strong>{whatItDoes}</strong>.</FadeIn>, },
  { render: ({ charity: { result } }, s) => <FadeIn key={s}>{result}</FadeIn>, },
  { render: (_, s) => <FadeIn key={s}>You've done something <strong>really good</strong><br />this Christmas.<br /><br /><strong>Nice one!</strong></FadeIn>, },
  { 
    render: (_, s) => (
      <>
        <FadeIn key={s} style={{ fontSize: "64px", maxWidth: "none" }}>Merry Christmas!</FadeIn>
        <FadeIn key={s + 1}>Have an awesome day - hope you get lots of prezzies!</FadeIn>
        <FadeIn key={s + 2}>- Love Uncle Ad</FadeIn>
      </>
    ), 
    button: ({ complete }) => <button onClick={complete}><CardsHeartIcon size={64} fill="currentColor" /></button>
  },
]



export default ({ name, charity, onComplete }) => {
  const [s, setScreen] = useState(0)

  const next = () => {
    if( s + 1 < screens.length ) setScreen(s + 1)
    else onDone()
  }

  const { render: renderScreen, button } = screens[s]

  return (
    <Completion>
      {renderScreen({ name, charity }, s)}
      { 
        button 
          ? button({ next, complete: onComplete }) 
          : <button className="bump" onClick={next}><ArrowRightThickIcon size={64} fill="currentColor" /></button>
      }
    </Completion>
  )
}
