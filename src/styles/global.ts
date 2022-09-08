import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

    *{
        margin:0px;
        padding:0px;
        box-sizing: border-box;
        user-select: none;
 
    }

    :focus{
        outline: none;
        box-shadow: none;
    }


    border-style, input-security, textarea,button,a,span,p,div {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: 'Baloo 2', sans-serif;
        font-weight: 400;
    
    }
    main, body{
        background: ${(props) => props?.theme?.["gray-background"]};
        
    }

`;
