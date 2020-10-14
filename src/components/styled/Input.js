import styled from 'styled-components'

const Input = styled.input`
  height: 24px;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid black;
  background: transparent;
  box-shadow: none;
  outline: none;
  padding-right: 16px;
  font-size: 12px;
  margin-bottom: 12px;

  &:valid {
    border-bottom: 1px solid var(--color-valid);
  }
   &:valid + span:after {
    content: '✔';
    color: var(--color-valid);
  } 
  &:placeholder-shown {
    font-size: 12px;
    opacity: 1;
  }

  &:not(:placeholder-shown):invalid {
    border-bottom: 1px solid var(--color-invalid);
  }
  &:not(:placeholder-shown):invalid + span:after {
    content: '✖';
    color: var(--color-invalid);
  }

  /* &:not(:focus):placeholder-shown {
    border-bottom: 1px solid yellow;
    outline: none;
    //box-shadow: none;
  } */

  &:not(:focus):not(:placeholder-shown):valid + span:after {
    content: '✔';
    color: var(--color-valid);
  }
`

export default Input
