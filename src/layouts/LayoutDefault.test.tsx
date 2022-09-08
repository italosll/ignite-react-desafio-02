import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { DefaultLayout } from "./LayoutDefault";
import { BrowserRouter } from "react-router-dom";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithBroswerRouter(
  component: ReactElement<any, string | JSXElementConstructor<any>>
) {
  const wrapper = ({ children }: WrapperProps) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };

  return {
    ...render(component, { wrapper }),
  };
}

describe("Layout Default Component", () => {
  it("should render the application default layout", () => {
    renderWithBroswerRouter(<DefaultLayout />);
  });
});
