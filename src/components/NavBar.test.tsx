import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import { AMOUNT_TITLE, Navbar } from "./NavBar";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";

import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "../context/CartContext";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithProviders(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  { initialCartItemsAmount = 0 } = {}
) {
  const providerProps = {
    initialCartItemsAmount,
  };

  const wrapper = ({ children }: WrapperProps) => {
    return (
      <BrowserRouter>
        <CartProvider {...providerProps}>{children}</CartProvider>
      </BrowserRouter>
    );
  };

  return {
    ...render(component, { wrapper }),
  };
}

describe("Navbar component", () => {
  it("should render Navbar whithout cart itens amount indicator", () => {
    renderWithProviders(<Navbar />);

    expect(screen.queryByTitle(AMOUNT_TITLE)).not.toBeInTheDocument();
  });

  it("should render Navbar whith cart itens amount indicator", () => {
    const initialCartItemsAmount = 9;

    renderWithProviders(<Navbar />, { initialCartItemsAmount });

    const amountIndicatorSpan = screen.getByTitle(AMOUNT_TITLE);

    expect(amountIndicatorSpan).toBeInTheDocument();
    expect(screen.getByText(initialCartItemsAmount)).toBeInTheDocument();
  });
});
