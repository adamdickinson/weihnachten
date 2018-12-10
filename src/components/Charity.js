import { rgba } from "polished"
import ArrowLeftThickIcon from "mdi-react/ArrowLeftThickIcon"
import ArrowRightThickIcon from "mdi-react/ArrowRightThickIcon"
import classNames from "classnames"
import colors from "material-colors-object"

import React from "react"
import styled from "styled-components"



const Background = styled.img`
  height: 100vh;
  left: 0;
  object-fit: cover;
  position: absolute;
  top: 0;
  width: 100vw;
`

const Content = styled.div`
  height: 100vh;
  overflow: auto;
  position: relative;
  z-index: 1;
`

const Headline = styled.div`
  height: 15vh;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    width: 15vh;
    height: 15vh;
  }

  h1 {
    flex: 1 0;
    text-align: center;
    font-weight: bold;
    font-size: 48px;
    margin: 0;
  }
`

const Info = styled.div`
  flex: 1 0; 
  align-items: center;
  justify-content: center;
  text-transform: none;

  button {
    padding: 0.5em 1.5em;
    font-weight: bold;
    margin-top: 2em;
    background: ${colors["deep-purple"].shades.a100.value};
  }

  h2 {
    font-weight: bold;
    margin: 1em 0 0.75em;
    font-size: 48px;
  }

  &.landscape {
    display: flex;
    flex-direction: column;
    text-align: center;

    img {
      width: 100%;
    }

    .image {
      margin: 0 auto 1em;
      max-width: 560px;
    }

    .text {
      width: 800px;
    }
  }

  &.portrait {
    display: flex;
    flex-direction: row;

    .image, .text {
      margin-bottom: 10vh;
    }

    .image {
      width: 320px;
      padding-right: 96px;
    }

    .text {
      width: 500px;
    }
  }
`

const Scroller = styled.div`
  background: ${rgba(colors["red"].shades.a400.value, 0.9)};
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin-top: 85vh;
  align-items: center;
  justify-content: center;
`

const Wrap = styled.div`
	background-attachment: fixed;
	background-size: cover;
  flex: 0 0 auto;
  overflow: auto;
  position: relative;
  width: 100vw;

  button {
    transition: 400ms opacity;
    opacity: 0;
  }

  &.isFocus button {
    opacity: 1;
  }
`




export default function Charity({ 
  charity,
  isFocus,
  onNext,
  onPrev,
  onSelect,
}) {
  const { 
    background,
    description,
    logo,
    name,
    orientation,
    purpose,
    shortName,
  } = charity
  return (
    <Wrap className={classNames({ isFocus })}>
      <Background src={background} />
      <Content>

        <Scroller>
          <Headline>
            {!!onPrev && (
              <button className="bump-left" onClick={onPrev}>
                <ArrowLeftThickIcon size={64} fill="currentColor" />
              </button>
            )}

            <h1>{purpose}</h1>

            {!!onNext && (
              <button className="bump-right" onClick={onNext}>
                <ArrowRightThickIcon size={64} fill="currentColor" />
              </button>
            )}
          </Headline>

          <Info className={orientation}>
            <div className="image">
              <img src={logo} alt={name} />
            </div>

            <div className="text">
              <h2>{name}</h2>
              <p>{description}</p>
              <button onClick={() => onSelect(charity)}>Choose {shortName}</button>
            </div>
          </Info>
        </Scroller>

      </Content>
    </Wrap>
  )
}
