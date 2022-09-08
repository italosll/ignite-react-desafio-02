import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyles } from "./styles/global";
import { CartProvider } from "./context/CartContext";
import { Loading } from "./components/Loading";
import { LoadingProvider } from "./context/LoadingContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <LoadingProvider>
        <Loading />
        <BrowserRouter>
          <CartProvider>
            <Router />
          </CartProvider>
        </BrowserRouter>
        <GlobalStyles />
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
