import classNames from "classnames"

import React, { useEffect, useState } from "react"
import styled from "styled-components"



const Fader = styled.div`
  opacity: 0;
  transform: translateX(20px);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
  max-width: 600px;
  margin-bottom: 1em;

  &.isIn {
    opacity: 1;
    transform: translateX(0);
  }
`



export default function FadeIn({ children, style }) {
  const [isIn, setIsIn] = useState(false)
  useEffect(() => setIsIn(true), [])

  return (
    <Fader className={classNames({ isIn })} style={style}>
      {children}
    </Fader>
  )
}
