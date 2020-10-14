import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import FormAddLinksToCollection from './FormAddLinksToCollection'

const StyledToggleFormAddLinks = styled.section`
align-items: end;
 
  display: flex;
  flex-direction: column;
  margin: 12px 0;

  .buttonToggleOpener {
    width: fit-content;
    min-width: 24px;
    height: 24px;
    font-size: 16px;
    justify-self: end;
    background: var(--color-bg);
    border: none;
    cursor: pointer;
    margin-bottom: 6px;
    border-bottom: 2px solid var(--color-accent);

    &:hover {
      background-color: var(--color-accent);
    }
  }

  .formOpened {
    display: flex;
    flex-direction: column;
  }
`

const ToggleFormAddLinks = ({ collection }) => {
  const [formVisible, setFormVisible] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleControlsVisibility = (e) => {
    e.preventDefault()
    setFormVisible(!formVisible)
  }

  useEffect(() => {
    if (isFormSubmitted) {
      setFormVisible(false)
      setIsFormSubmitted(false)
      window.scrollTo(0,0)
    }
  }, [isFormSubmitted])

  return (
    <StyledToggleFormAddLinks>
      <div>
        <button
          className="buttonToggleOpener"
          type="button"
          onClick={handleControlsVisibility}
        >
          {formVisible ? '× Close' : '+ Add links to collection'}
        </button>
      </div>
      {formVisible && <div className="formOpened">
       <FormAddLinksToCollection collection={collection} setSubmitted={() => setIsFormSubmitted(true)}/>
       </div>}
    </StyledToggleFormAddLinks>
  )
}

export default ToggleFormAddLinks
