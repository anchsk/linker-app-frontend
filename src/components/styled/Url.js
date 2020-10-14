import styled from 'styled-components'

const Url = styled.a`
  display: inline-block;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;

  color: var(--color-link-primary);
  line-height: 1.2;

 /*  &:before {
    content: "•";
    display: inline-block;
    margin-right: 2px;
    text-decoration: none;
  }
 */
  &:hover {
    color: var(--color-link-hover);
  }
`

export default Url
