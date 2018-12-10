import React, { useState } from "react"
import styled from "styled-components"

import Charity from "./Charity"
import Buttons from "../images/buttons.jpg"
import Thumbs from "../images/thumbs.jpg"
import Tiger from "../images/tiger.jpg"
import Vinnies from "../images/vinnies.jpg"

import VinniesLogo from "../images/vinnies-logo.svg"
import WwfLogo from "../images/wwf-logo.svg"
import KivaLogo from "../images/kiva-logo.svg"
import OxfamLogo from "../images/oxfam-logo.svg"



const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  transition: 500ms transform ease-in-out;
  transform: translateX(${props => (props.position * -100) + "vw"});
  overflow: visible;
  width: auto;
`


const charities = [
  { 
    background: Tiger, 
    purpose: "Help Animals in Danger",
    whatItDoes: "help animals who need it most",
    name: "World Wildlife Fund",
    shortName: "WWF",
    logo: WwfLogo,
    orientation: "portrait",
    result: (
      <p>
        There are <strong>tigers</strong>, <strong>pandas</strong>, <strong>elephants</strong>, <strong>gorillas</strong>, <strong>rhinos</strong> all over the world who will now be safe and happy <strong>thanks to you</strong>!
      </p>
    ),
    description: `
      This charity helps animals and protects the environment all over the 
      world!
    `,
  },
  { 
    background: Vinnies, 
    purpose: "Help People in Australia",
    whatItDoes: "help people who need it most",
    name: "St Vincent de Paul",
    shortName: "Vinnies",
    logo: VinniesLogo,
    orientation: "landscape",
    result: (
      <p>
        There are people here in Australia who will get <strong>food</strong> and a <strong>place to stay thanks to you</strong>!
      </p>
    ),
    description: `
      Not everyone has food to eat, or a place to stay. This charity gives
      food, shelter and warm clothes to those who need it most!
    `,
  },
  { 
    background: Buttons, 
    purpose: "Help Create Opportunities",
    whatItDoes: "give an opportunity to the people need it most",
    name: "Kiva",
    shortName: "Kiva",
    logo: KivaLogo,
    orientation: "portrait",
    result: (
      <p>
        There are people all over the world who will now be able to <strong>build a life</strong> and support their <strong>families</strong> and <strong>communities thanks to you</strong>!
      </p>
    ),
    description: `
      This charity gives disadvantaged people all over the world the money they
      need to start their own business, so they can feed their family and help
      their community!
    `,
  },
  { 
    background: Thumbs, 
    purpose: "Help People Overseas",
    whatItDoes: "help people need it most",
    name: "OXFAM",
    shortName: "OXFAM",
    logo: OxfamLogo,
    orientation: "portrait",
    result: (
      <p>
        There are people all over the world who will get <strong>clean water</strong>, <strong>food</strong>, <strong>education</strong> and <strong>medicine thanks to you</strong>!
      </p>
    ),
    description: `
      This charity gives people all over the world clean water, food, schools
      and medicine!
    `,
  },
]


export default function Charities({ onDone, onChangeName, onSelect }) {
  const [current, setCharity] = useState(charities[0])
  const lastIndex = charities.length - 1

  const prevCharity = () => setCharity(charities[charities.indexOf(current) - 1])
  const nextCharity = () => setCharity(charities[charities.indexOf(current) + 1])

  const selectCharity = charity => {
    onSelect(charity)
    onDone()
  }

  return (
    <Wrap position={charities.indexOf(current)}>
      {charities.map((charity, c) => (
        <Charity 
          key={c} 
          isFocus={charity === current}
          onNext={c < lastIndex && nextCharity} 
          onPrev={c && prevCharity} 
          onSelect={selectCharity}
          charity={charity}
        />
      ))}
    </Wrap>
  )
}
