import { render, screen } from "@testing-library/react";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { Item } from "../../context/CartReducer";

import FakeTimers from "@sinonjs/fake-timers";

import {
  LoadingContext,
  LOADING_VISIBLE_INTERVAL_IN_MILISECONDS,
} from "../../context/LoadingContext";
import {
  ERROR_MESSAGE_PAYMENT_TYPE,
  PageCheckout,
  TEST_LABEL_INPUT_CEP,
  TEST_LABEL_INPUT_CITY,
  TEST_LABEL_INPUT_COMPLEMENT,
  TEST_LABEL_INPUT_NEIGHBORHOOD,
  TEST_LABEL_INPUT_NUMBER,
  TEST_LABEL_INPUT_STREET,
  TEST_LABEL_INPUT_UF,
  TEST_PAYMENT_TYPE_NOT_SELECTED,
  TEST_PAYMENT_TYPE_SELECTED,
  TEST_ROLE_BUTTON_CREDIT_CARD,
  TEST_TEXT_BUTTON_CONFIRM_ORDER,
} from "./PageCheckout";

import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";
import console from "console";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

interface MockProviderProps {
  providerProps?: {
    cartItems: Item[];
    displayLoading?: jest.Mock<any, any>;
    resetCart?: jest.Mock<any, any>;
  };
}

function renderWithProviders(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  { providerProps = { cartItems: [] } }: MockProviderProps
) {
  const wrapper = ({ children }: WrapperProps) => {
    return (
      <CartContext.Provider value={{ ...providerProps } as any}>
        <LoadingContext.Provider value={{ ...providerProps } as any}>
          <MemoryRouter>{children}</MemoryRouter>
        </LoadingContext.Provider>
      </CartContext.Provider>
    );
  };

  return {
    ...render(component, { wrapper }),
  };
}

describe("PageCheckout Provider Component", () => {
  const cartItems = [
    {
      amount: 2,
      availableAmount: 10,
      id: 1,
      image: "url/image",
      name: "coffe 1",
      price: 9.4,
      cartId: "@4543",
    },
    {
      amount: 9,
      availableAmount: 10,
      id: 2,
      image: "url/image",
      name: "coffe 2",
      price: 9.7,
      cartId: "@765",
    },
  ];

  const mockDisplayLogin = jest.fn();
  const mockResetCart = jest.fn();

  const providerProps = {
    cartItems,
    displayLoading: mockDisplayLogin,
    resetCart: mockResetCart,
  };

  const fillInputs = async (inputs: any) => {
    await userEvent.type(inputs?.inputCep, "75603000");
    await userEvent.type(inputs?.inputStreet, "Rua Itumbiara");
    await userEvent.type(inputs?.inputNumber, "108");
    await userEvent.type(inputs?.inputComplement, "Complemento");
    await userEvent.type(inputs?.inputNeighboorhood, "Comendador");
    await userEvent.type(inputs?.inpuCityt, "Porteirão");
    await userEvent.type(inputs?.inputUf, "GO");
  };

  const verifySelectCreditCard = async (
    buttonCreditCard: HTMLButtonElement
  ) => {
    expect(buttonCreditCard?.value).toBe(TEST_PAYMENT_TYPE_NOT_SELECTED);

    await userEvent.click(buttonCreditCard);

    expect(buttonCreditCard?.value).toBe(TEST_PAYMENT_TYPE_SELECTED);
  };

  it("should select credit card payment method", async () => {
    renderWithProviders(<PageCheckout />, { providerProps });

    const buttonCreditCard: HTMLButtonElement = screen.getByRole("button", {
      name: TEST_ROLE_BUTTON_CREDIT_CARD,
    });

    await verifySelectCreditCard(buttonCreditCard);
  });

  it("should deselect credit card payment method and show error", async () => {
    renderWithProviders(<PageCheckout />, { providerProps });

    const buttonCreditCard: HTMLButtonElement = screen.getByRole("button", {
      name: TEST_ROLE_BUTTON_CREDIT_CARD,
    });

    expect(
      screen.queryByText(ERROR_MESSAGE_PAYMENT_TYPE)
    ).not.toBeInTheDocument();

    await verifySelectCreditCard(buttonCreditCard);

    await userEvent.click(buttonCreditCard);

    expect(buttonCreditCard?.value).toBe(TEST_PAYMENT_TYPE_NOT_SELECTED);

    expect(screen.queryByText(ERROR_MESSAGE_PAYMENT_TYPE)).toBeInTheDocument();
  });

  test("should fill the form and confirm the order", async () => {
    renderWithProviders(<PageCheckout />, { providerProps });

    const buttonCreditCard: HTMLButtonElement = screen.getByRole("button", {
      name: TEST_ROLE_BUTTON_CREDIT_CARD,
    });

    await verifySelectCreditCard(buttonCreditCard);

    const inputCep = screen.getByLabelText(TEST_LABEL_INPUT_CEP);
    const inputStreet = screen.getByLabelText(TEST_LABEL_INPUT_STREET);
    const inputNumber = screen.getByLabelText(TEST_LABEL_INPUT_NUMBER);
    const inputComplement = screen.getByLabelText(TEST_LABEL_INPUT_COMPLEMENT);
    const inpuCityt = screen.getByLabelText(TEST_LABEL_INPUT_CITY);
    const inputUf = screen.getByLabelText(TEST_LABEL_INPUT_UF);
    const inputNeighboorhood = screen.getByLabelText(
      TEST_LABEL_INPUT_NEIGHBORHOOD
    );

    const buttonConfirmOrder = screen.getByRole("button", {
      name: TEST_TEXT_BUTTON_CONFIRM_ORDER,
    });

    await fillInputs({
      inputCep,
      inputStreet,
      inputNumber,
      inputComplement,
      inpuCityt,
      inputUf,
      inputNeighboorhood,
    });

    expect(mockDisplayLogin).toBeCalledTimes(0);
    expect(mockResetCart).toBeCalledTimes(0);

    screen.logTestingPlaygroundURL();
    await userEvent.click(buttonConfirmOrder);
    // jest.clearAllTimers()

    jest.runAllTicks();
    jest.runAllTimers();

    jest.advanceTimersByTime(1000);
    jest.runOnlyPendingTimers();
    jest.advanceTimersToNextTimer(1);
    console.log("jest.getTimerCount()");

    console.log(jest.getTimerCount());

    // expect(setTimeout).toHaveBeenCalledTimes(1);
    // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    jest.useRealTimers();
  });
});
