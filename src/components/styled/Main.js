import styled from 'styled-components'

const Main = styled.main`
  // As a child of div#root:
  flex-grow: 1;

  // As a parent:
  ${(props) => {
    if (props.flex) {
      return `
      background-color: orange;
      display: flex;
      flex-direction: column;
      `
    }
  }}
`

export default Main
