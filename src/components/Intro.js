import ArrowRightThickIcon from "mdi-react/ArrowRightThickIcon"
import CheckIcon from "mdi-react/CheckIcon"
import colors from "material-colors-object"

import React, { useState } from "react"
import styled from "styled-components"

import FadeIn from "./FadeIn"



const Intro = styled.div`
  align-items: center;
  background: ${colors["deep-purple"].shades.a100.value};
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
    max-width: 12em;
    outline: none;
    font-family: inherit;
    text-transform: inherit;
    text-align: center;
    margin: 1em 0;
  }

`

const screens = [
  {
    render: ({ name, setName, next }) => (
      <>
        <label>What's your name?</label>
        <input 
          onChange={e => setName(e.target.value)} value={name} 
          onKeyPress={e => e.key === "Enter" && next()}
        />
      </>
    ),
  },
  { render: ({ name }, s) => <FadeIn key={s}>You know what {name}?<br />We're <strong>super lucky</strong>!</FadeIn>, },
  { render: (_, s) => <FadeIn key={s}>We have a <strong>home</strong>, <strong>food</strong>,<br /><strong>family</strong> and <strong>safety</strong>.</FadeIn>, },
  { render: (_, s) => <FadeIn key={s}>But <strong>not everyone has that</strong>.</FadeIn>, },
  { render: (_, s) => <FadeIn key={s}>So <strong>it's up to us</strong> to help.</FadeIn>, },
  { render: (_, s) => <FadeIn key={s}>So for Christmas this year,<br /><strong> you get $50!</strong></FadeIn>, },
  { render: (_, s) => <FadeIn key={s}>But there's a catch...</FadeIn>, },
  { render: (_, s) => <FadeIn key={s}><strong>You can't spend it on yourself.</strong></FadeIn>, },
  { render: (_, s) => <FadeIn key={s}>Instead, you get to spend it to <br /><strong>help someone who needs it most</strong>.</FadeIn>, },
  { render: (_, s) => <FadeIn key={s}>And <strong>you get to choose</strong><br />where that money goes.</FadeIn>, },
  { 
    render: (_, s) => <FadeIn key={s}>Ready?</FadeIn>, 
    button: ({ next }) => <button onClick={next}><CheckIcon size={64} fill="currentColor" /></button>
  },
]



export default ({ name, onDone, onChangeName }) => {
  const [s, setScreen] = useState(0)

  const next = () => {
    if( s + 1 < screens.length ) setScreen(s + 1)
    else onDone()
  }

  const { render: renderScreen, button } = screens[s]

  return (
    <Intro>
      {renderScreen({ name, setName: onChangeName, next }, s)}
      { 
        button 
          ? button({ next }) 
          : <button className="bump" onClick={next}><ArrowRightThickIcon size={64} fill="currentColor" /></button>
      }
    </Intro>
  )
}
