import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { paymentType } from "../Checkout/PageCheckout";
import {
  formatRemainingTime,
  LocationState,
  MIN_AWAITING_TIME,
  PageSuccess,
} from "./PageSuccess";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithLocationState(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  pageSuccessLocationState: LocationState
) {
  const wrapper = ({ children }: WrapperProps) => {
    return (
      <MemoryRouter initialEntries={[{ state: pageSuccessLocationState }]}>
        {children}
      </MemoryRouter>
    );
  };

  return {
    ...render(component, { wrapper }),
  };
}

describe("Page Success Component", () => {
  it("should render Succes Page with infos", () => {
    const deliveryTimePrevision = "37";

    let pageSuccessLocationState: LocationState = {
      cep: "75600000",
      city: "Porteirão",
      neighborhood: "Centro",
      number: "22",
      paymentType: paymentType.CREDIT_CARD,
      deliveryTimePrevision,
      street: "Rua Goiatuba",
      uf: "GO",
      complement: "Sem complemento",
    };

    renderWithLocationState(<PageSuccess />, pageSuccessLocationState);

    const expectedRemainingTime = formatRemainingTime({
      maxAwaitingTime: deliveryTimePrevision,
      minAwaitingTime: MIN_AWAITING_TIME,
    });

    const remainingTime = screen.getByText(expectedRemainingTime);
    const payment = screen.getByText(paymentType.CREDIT_CARD);
    const address = screen.getByText(/entrega emcentro \- porteirão, go/i);

    expect(remainingTime).toBeInTheDocument();
    expect(payment).toBeInTheDocument();
    expect(address).toBeInTheDocument();
  });
});
