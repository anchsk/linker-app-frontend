import styled from 'styled-components'

const ButtonContinue = styled.button`
  background: transparent;
  width: fit-content;
  border: none;
  font-size: 1rem;
  cursor: pointer;

  ${(props) => {
      if (props.disabled) {
          return `
          pointer-events: none;
          opacity: .5;`
      }
  }

  }
`

export default ButtonContinue
