import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { CartContext } from "../../context/CartContext";
import { Item } from "../../context/CartReducer";
import { PageHome } from "./PageHome";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TEST_ID_COFFE_CARD_CART_ICON } from "./components/CoffeCard";

interface MockFunctions {
  functions?: {
    decreaseAmount?: jest.Mock<any, any>;
    increaseAmount?: jest.Mock<any, any>;
    removeItem?: jest.Mock<any, any>;
    addToCart?: jest.Mock<any, any>;
    resetCart?: jest.Mock<any, any>;
  };
}

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithProviders(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  cartItems: Item[],
  cartItemsAmount: number,
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

describe("PageHome component", () => {
  const cartItems: Item[] = [];

  const increaseAmount = jest.fn();
  const decreaseAmount = jest.fn();
  const removeItem = jest.fn();
  const resetCart = jest.fn();

  const cartItemsAmount = cartItems?.length;

  it("should render the page home page", () => {
    render(<PageHome />);
  });

  it("should add a item to cart", async () => {
    const addToCart = jest.fn();

    renderWithProviders(<PageHome />, cartItems, cartItemsAmount, {
      functions: { addToCart },
    });
    const buttonCart = screen.getAllByTestId(TEST_ID_COFFE_CARD_CART_ICON)[0];

    expect(addToCart).toBeCalledTimes(0);

    await userEvent.click(buttonCart);

    expect(addToCart).toBeCalledTimes(1);
  });
});
