import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    body {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    body::-webkit-scrollbar {
      display: none;
    }

    .hideVerticalScrollBar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .hideVerticalScrollBar::-webkit-scrollbar {
      display: none;
    }
`;

export default GlobalStyle;
