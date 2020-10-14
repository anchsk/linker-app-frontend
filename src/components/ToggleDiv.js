import React, { useState } from 'react'

import styled from 'styled-components'

import ButtonIcon from './ButtonIcon'

const StyledToggleDiv = styled.div`
  //relative to parent
  position: absolute;
  
  top: 0;
  right: 0;
  border: none;
  display: flex;
  flex-direction: column;

  .buttonToggle {
    width: 20px;
    height: 20px;
    align-self: flex-end;

    /* &:hover {
     svg > * {
      
     fill: var(--color-accent);
     }
    } */
  }
  .close {
   padding: 2px;

   svg > * {
    stroke: black;
   }
   /* &:hover {
    svg > * {
    stroke: var(--color-accent);
    }
   } */
  }

  > .openedToggle {
    position: absolute;
    right: 0;
    z-index: 10;

    border-radius: none;
    border: 1px solid var(--color-accent);
    position: relative;
    background-color: var(--color-accent);

    display: flex;
    flex-direction: column;
    min-width: fit-content:
    width: fit-content;

    //overflow: hidden;

  }
`

const ToggleDiv = ({ isToggleOpen, children, toggleVariant }) => {
  const [isOpen, setIsOpen] = useState(isToggleOpen)

  const handleOpen = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <StyledToggleDiv
      onMouseLeave={() => {
        setIsOpen(false)
      }}
    >
      {isOpen ? (
        <ButtonIcon
          className='buttonToggle close'
          handleClick={handleOpen}
          variant='close'
        />
      ) : (
        <ButtonIcon
          className='buttonToggle'
          handleClick={handleOpen}
          variant={toggleVariant === 'add' ? 'add' : 'open'}
        />
      )}

      {isOpen && <div className='openedToggle'>{children}</div>}
    </StyledToggleDiv>
  )
}

export default ToggleDiv
