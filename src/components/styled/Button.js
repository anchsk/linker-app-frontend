import styled from 'styled-components'

/**
 *
 * Possible styles:
 * primary
 * disabled
 * primary && disabled
 * delete
 */

const Button = styled.button`
  border: none;
  border-radius: 4px;
  padding: 9px 8px 8px 8px;
  font-size: 14px;
  min-width: 60px;
  width: fit-content;
  cursor: pointer;
  
  ${(props) => {
    if (props.primary && !props.disabled) {
      return `background-color: #4c4949;
      color: white;

      &:hover {
        background-color: black;
        transition: background-color 0.5s;
      }
      `
    }
    if (props.primary && props.disabled) {
      return `background-color: lightgray;
      pointer-events: none;
      `
    }

    if (props.delete) {
      return `
      background: none;
      border-bottom: 1px solid gray;
      border-radius: 0;
      padding: 0;
      margin-top: 12px;
      margin-bottom: 3px;
      color: var(--color-text-secondary);
      
      &:hover {
        color: var(--color-invalid);
        border-bottom: 1px solid var(--color-invalid);
      }`
    }

    }
  }}
`
/*${(props) =>
    props.primary &&
    css`
      background-color: #4c4949;
      //border: 1px solid #4c4949;
      border: transparent;
      color: white;
    `}  */
export default Button
