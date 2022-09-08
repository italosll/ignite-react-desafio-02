import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { LoadingProvider } from "../context/LoadingContext";
import { Loading, SVG_SPINNER_TITLE } from "./Loading";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../styles/themes/default";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithLoadingProvider(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  { isLoadingInitialValue = false } = {}
) {
  const providerProps = {
    isLoadingInitialValue,
  };

  const Wrapper = ({ children }: WrapperProps) => {
    return (
      <ThemeProvider theme={defaultTheme}>
        <LoadingProvider {...providerProps}>{children}</LoadingProvider>;
      </ThemeProvider>
    );
  };

  return {
    ...render(component, { wrapper: Wrapper }),
  };
}

describe("Loading Component", () => {
  it("should display spinner", async () => {
    renderWithLoadingProvider(<Loading />, { isLoadingInitialValue: true });

    await waitFor(() => {
      const spinner = screen.getByTitle(SVG_SPINNER_TITLE);
      expect(spinner).toBeInTheDocument();
    });
  });

  it("should not display spinner", async () => {
    renderWithLoadingProvider(<Loading />, { isLoadingInitialValue: false });

    await waitFor(() => {
      const spinner = screen.queryByTitle(SVG_SPINNER_TITLE);
      expect(spinner).not.toBeInTheDocument();
    });
  });
});
