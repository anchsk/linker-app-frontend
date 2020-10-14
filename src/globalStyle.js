import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`

  :root {

    --color-bg: rgb(255, 253, 245);
    --color-valid: #a9dc76;
    --color-invalid: #ff6188;
    //--color-accent: rgb(255, 217, 169);
    --color-accent: rgb(243, 231, 209);
    --color-accent-hover: rgb(242, 188, 89);
    //--color-accent: rgb(213, 247, 250);
    --color-text: rgb(64, 64, 64);
    --color-tag: rgb(242, 242, 242);
    --color-text-secondary: rgb(111, 109, 109);

    --color-link-primary: rgb(17, 97, 204);
    --color-link-hover: rgb(25, 85, 242);
    --color-link-visited: rgb(97, 83, 117);

    --border: 1px solid rgb(243, 231, 209);
    --border-radius: 4px;  

  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Inter, Open Sans, sans-serif;
    font-weight: 400;
    
 }
 
  html, body {
    background-color: var(--color-bg);
    width: 100%;
    height: 100%;
     
    /* APP */
    #root {
      height: fit-content;
      min-height: 100%;
      width: inherit;
      max-width: 600px;
      margin: 0 auto;
      padding: 0 12px;
      //border: 1px solid lightblue;
      display: flex;
      flex-direction: column;
      

      

    }
  }
  h1,
      h2,
      h3,
      h4,
      p {
        color: var(--color-text);
      }
  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
  
  
`

export default GlobalStyle
