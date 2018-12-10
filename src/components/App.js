import { reset } from "styled-reset"
import axios from "axios"
import colors from "material-colors-object"

import React, { useState } from "react"
import styled, { createGlobalStyle } from "styled-components"

import Charities from "./Charities"
import Completion from "./Completion"
import Intro from "./Intro"



const ResetStyles = createGlobalStyle`
  ${reset}

  body {
    font-family: Montserrat;
    font-weight: 300;
    font-size: 27px;
    text-transform: uppercase;
    letter-spacing: -0.05em;
    line-height: 1.3;
  }

  button {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-weight: bold;
    font: inherit;
    margin: 0;
    outline: none;
    padding: 0;
    text-transform: uppercase;

    svg {
      transition: transform 50ms ease-out;
      transform: translateX(0);
    }

    &.bump-left:hover svg {
      transform: translateX(-10px);
    }

    &.bump-right:hover svg {
      transform: translateX(10px);
    }
  }

  strong {
    font-weight: bold;
  }
`



const App = styled.div`
  background: ${colors["deep-purple"].shades.a100.value};
  color: #FFF;
  min-height: 100vh;
  display: flex;
  overflow: hidden;
`



const sendChoice = ({ name, charity }) => {
  const requester = axios.create({
    baseURL: "https://kvweihnachten-71b1.restdb.io/rest/",
    headers: {
      'cache-control': 'no-cache',
      'x-apikey': '38eebf695103dde4dcb88ce0bb9f11ed717c3',
    }
  })

  return requester.post("/choice", { donor: name || "Adam", charity })
}



export default () => {
  const stages = ["intro", "charities", "completion"]
  const [stageName, setStageName] = useState(stages[0])
  const nextStage = () => setStageName(stages[stages.indexOf(stageName) + 1])

  const [name, setName] = useState("")
  const [charity, setCharity] = useState(null)

  const reset = () => {
    setName("")
    setCharity(null)
    setStageName("intro")
  }

  const selectCharity = charity => {
    setCharity(charity)
    sendChoice({ name, charity: charity.name })
      .then(console.log)
      .catch(console.warn)
  }

  const stage = {
    intro: <Intro name={name} onChangeName={setName} onDone={nextStage} />,
    charities: <Charities onSelect={selectCharity} onDone={nextStage} />,
    completion: <Completion charity={charity} name={name} onComplete={reset} />,
  }

  return (
    <App>
      <ResetStyles />
      {stage[stageName]}
    </App>
  )
}
