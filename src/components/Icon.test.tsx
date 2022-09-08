import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { JSXElementConstructor, ReactElement, ReactNode } from "react";

import { IconBackground } from "./IconBackground";
import { ShoppingCart } from "phosphor-react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../styles/themes/default";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithThemeProvider(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  { initialCartItemsAmount = 0 } = {}
) {
  const providerProps = {
    initialCartItemsAmount,
  };

  const wrapper = ({ children }: WrapperProps) => {
    return (
      <ThemeProvider theme={defaultTheme} {...providerProps}>
        {children}
      </ThemeProvider>
    );
  };

  return {
    ...render(component, { wrapper }),
  };
}

describe("Icon component", () => {
  it("should render icon", () => {
    renderWithThemeProvider(
      <IconBackground background="purple">
        <ShoppingCart size={32} />
      </IconBackground>
    );
  });
});
