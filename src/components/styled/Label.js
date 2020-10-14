import styled from 'styled-components'

const Label = styled.label`
  margin: 0px;

  ${(props) => {
    if (props.required) {
      return `&:after {
       content: "*";
       font-size: 10px;
       vertical-align: super;
       
      }`
    }
  }}
`

export default Label
