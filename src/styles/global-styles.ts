import { createGlobalStyle } from 'styled-components'

const sizes = {
  mobile: '425px',
  tablet: '768px',
  laptop: '1200px'
}

export const devices = {
  mobile: `(min-width: ${sizes.mobile})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`
}

const GlobalStyle = createGlobalStyle`
  :root {

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

  button {
    font-size: 16px;
    cursor: pointer;
    color: #6c757d;
    background-color: #fff;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
  }
`

export default GlobalStyle
