import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import App from './App';
import { device } from './constants';

const GlobalStyle = createGlobalStyle`
  body{
    margin-top: 0;
    margin-bottom: 0;
  }

  :root{
    --navbar-height: 64px;

    // Grid settings
    --grid-width: 240px;
    --grid-gap: 8px;
  }

  @media ${device.tablet} {
    :root{
      --grid-width: 200px;
      --grid-gap: 8px;
    }
  }

  @media ${device.mobileL} {
    :root{
      --grid-width: 150px;
      --grid-gap: 8px;
    }
  }

  img {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <GlobalStyle />
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
