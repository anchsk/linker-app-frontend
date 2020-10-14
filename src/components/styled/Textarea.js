import styled from 'styled-components'

const Textarea = styled.textarea`
  background: transparent;
  outline: none;
  border: 1px solid black;
  padding: 6px;
  line-height: 1;
  font-size: 12px;
  margin-bottom: 12px;

  &:not(:focus):placeholder-shown {
    font-size: 12px;
    border: 1px solid black;
  }
  &:focus:placeholder-shown {
    border: 1px solid black;
  }
  &:invalid {
    border: 1px solid var(--color-invalid);
  }

  &:valid {
    border: 1px solid var(--color-valid);
  }
`

export default Textarea
