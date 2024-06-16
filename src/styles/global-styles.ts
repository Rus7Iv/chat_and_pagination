import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --mobile: (max-width: 480px);
    --tablet: (max-width: 768px);
    --laptop: (max-width: 1024px);

    font-family: 'Inter', sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
    background-color: #f8f9fA;
    justify-content: center;
    align-items: center;
  }
`

export default GlobalStyle
