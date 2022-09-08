import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import {
  TEST_ID_SVG_MINUS,
  TEST_ID_SVG_PLUS,
} from "../../../components/Counter";
import { CartContext, CartProvider } from "../../../context/CartContext";
import { Item } from "../../../context/CartReducer";
import { CartItem, TEST_ROLE_CART_ITEM_REMOVE_BUTTON } from "./CartItem";

interface MockFunctions {
  functions?: {
    decreaseAmount?: jest.Mock<any, any>;
    increaseAmount?: jest.Mock<any, any>;
    removeItem?: jest.Mock<any, any>;
  };
}

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithProviders(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  { functions = {} }: MockFunctions
) {
  const wrapper = ({ children }: WrapperProps) => {
    return (
      <CartContext.Provider value={{ ...functions } as any}>
        {children}
      </CartContext.Provider>
    );
  };

  return {
    ...render(component, { wrapper }),
  };
}

describe("CartItem Component", () => {
  const item: Item = {
    amount: 1,
    availableAmount: 10,
    id: 1,
    image: "url/image",
    name: "coffe",
    price: 9.7,
    cartId: "@4543",
  };

  const user = userEvent.setup();

  const mockIncreaseAmount = jest.fn();
  const mockDecreaseAmount = jest.fn();
  const mockRemoveItem = jest.fn();

  const functions = {
    increaseAmount: mockIncreaseAmount,
    decreaseAmount: mockDecreaseAmount,
    removeItem: mockRemoveItem,
  };

  it("should render the component", () => {
    renderWithProviders(<CartItem {...item} />, {});
  });

  it("should call the increase method", async () => {
    renderWithProviders(<CartItem {...item} />, { functions });
    const iconIncreaseAmount = screen.getByTestId(TEST_ID_SVG_PLUS);
    expect(mockIncreaseAmount).toBeCalledTimes(0);

    await user.click(iconIncreaseAmount);

    expect(mockIncreaseAmount).toBeCalledTimes(1);
  });

  it("should call the decrease method", async () => {
    renderWithProviders(<CartItem {...{ ...item, amount: 2 }} />, {
      functions,
    });

    const buttonDecrease = screen.getByTestId(TEST_ID_SVG_MINUS);

    expect(mockDecreaseAmount).toBeCalledTimes(0);

    await user.click(buttonDecrease);

    expect(mockDecreaseAmount).toBeCalledTimes(1);
  });

  it("should call the remove item method", async () => {
    renderWithProviders(<CartItem {...item} />, { functions });
    const buttonRemoveItem = screen.getByRole("button", {
      name: TEST_ROLE_CART_ITEM_REMOVE_BUTTON,
    });
    expect(mockRemoveItem).toBeCalledTimes(0);

    await user.click(buttonRemoveItem);

    expect(mockRemoveItem).toBeCalledTimes(1);
  });
});
