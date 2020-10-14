import styled from 'styled-components'

const ButtonMenu = styled.button`
  min-width: fit-content;
  width: 100%;
  text-align: left;
  background: transparent;
  background-color: var(--color-accent);
  padding: 6px 12px;
  border-radius: 0;
  border-bottom: 1px solid var(--color-bg);
  border: 0;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: inherit;

  &:hover {
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-accent);
  }
`

export default ButtonMenu
