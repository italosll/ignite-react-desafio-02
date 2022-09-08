import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { PageCheckout } from "./pages/Checkout/PageCheckout";
import { PageHome } from "./pages/Home/PageHome";
import { PageSuccess } from "./pages/Success/PageSuccess";
import { Router, URL_CHECKOUT, URL_HOME, URL_SUCCESS } from "./Router";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithBroswerRouter(
  component: ReactElement<any, string | JSXElementConstructor<any>>
) {
  const wrapper = ({ children }: WrapperProps) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };

  return render(component, { wrapper });
}

function renderWithMemoryRouter(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  initialEntries: string[]
) {
  const wrapper = ({ children }: WrapperProps) => {
    return (
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    );
  };

  return render(component, { wrapper });
}

describe("Router Component", () => {
  it("should render the router component", () => {
    renderWithBroswerRouter(<Router />);
  });

  it("should render the PageHome", () => {
    renderWithMemoryRouter(<PageHome />, [URL_HOME]);
  });
  it("should render the PageCheckout", () => {
    renderWithMemoryRouter(<PageCheckout />, [URL_CHECKOUT]);
  });
  it("should render the PageSuccess", () => {
    renderWithMemoryRouter(<PageSuccess />, [URL_SUCCESS]);
  });
});
