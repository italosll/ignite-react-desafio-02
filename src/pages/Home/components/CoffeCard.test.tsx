import { render, screen } from "@testing-library/react";
import coffeCover from "../../../assets/images/coffe/arabe.png";

import "@testing-library/jest-dom";

import { JSXElementConstructor, ReactElement, ReactNode } from "react";

import { Coffe, CoffeCard, TEST_ID_COFFE_CARD_CART_ICON } from "./CoffeCard";
import {
  TEST_ID_SVG_MINUS,
  TEST_ID_SVG_PLUS,
} from "../../../components/Counter";
import userEvent from "@testing-library/user-event";
import { CartContext } from "../../../context/CartContext";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

function renderWithCartProvider(
  component: ReactElement<any, string | JSXElementConstructor<any>>,
  addToCart: jest.Mock<any, any>
) {
  const wrapper = ({ children }: WrapperProps) => {
    return (
      <CartContext.Provider
        value={
          {
            addToCart,
          } as any
        }
      >
        {children}
      </CartContext.Provider>
    );
  };

  return {
    ...render(component, { wrapper }),
  };
}

describe("CoffeCard component", () => {
  const coffe: Coffe = {
    availableAmount: 10,
    badges: ["tradicional"],
    description: "Este café é maravilhoso!!!",
    id: 12345,
    image: coffeCover,
    name: "Árabe",
    price: 9,
  };

  const user = userEvent.setup();

  const increaseCounterAmount = async () => {
    const increaseIcon = screen.getByTestId(TEST_ID_SVG_PLUS);

    await user.click(increaseIcon);
  };

  const decreaseCounterAmount = async () => {
    const decreaseIcon = screen.getByTestId(TEST_ID_SVG_MINUS);

    await user.click(decreaseIcon);
  };

  it("should render CoffeCard correctly", () => {
    render(<CoffeCard {...coffe} />);

    const cover = screen.getByRole("img");
    const counterAmount = screen.getByText(/1/i);
    const badges = screen.getByText(/tradicional/i);
    const description = screen.getByText(/este café é maravilhoso!!!/i);
    const name = screen.getByRole("heading", {
      name: /árabe/i,
    });

    expect(cover).toBeInTheDocument();
    expect(counterAmount).toBeInTheDocument();
    expect(badges).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });

  it("should increase coffe card counter amount", async () => {
    render(<CoffeCard {...coffe} />);

    const counterAmount = screen.getByText(/1/i);
    expect(counterAmount).toBeInTheDocument();

    await increaseCounterAmount();

    const increasedCounterAmount = screen.getByText(/2/i);
    expect(increasedCounterAmount).toBeInTheDocument();
  });

  it("should decrease coffe card counter amount", async () => {
    render(<CoffeCard {...coffe} />);

    await increaseCounterAmount();

    const increasedCounterAmount = screen.getByText(/2/i);
    expect(increasedCounterAmount).toBeInTheDocument();

    await decreaseCounterAmount();

    const decreasedCounterAmount = screen.getByText(/1/i);
    expect(decreasedCounterAmount).toBeInTheDocument();
  });

  it("should call addItensToCart action", async () => {
    const mockAddToCartAction = jest.fn();

    renderWithCartProvider(<CoffeCard {...coffe} />, mockAddToCartAction);

    const buttonCart = screen.getByTestId(TEST_ID_COFFE_CARD_CART_ICON);

    expect(mockAddToCartAction).toBeCalledTimes(0);
    await user.click(buttonCart);
    expect(mockAddToCartAction).toBeCalledTimes(1);
  });

  it("should reset amount after adding itens to cart", async () => {
    const mockAddToCartAction = jest.fn();
    renderWithCartProvider(<CoffeCard {...coffe} />, mockAddToCartAction);

    const buttonIncrease = screen.getByTestId(TEST_ID_SVG_PLUS);
    const buttonCart = screen.getByTestId(TEST_ID_COFFE_CARD_CART_ICON);

    await user.click(buttonIncrease);
    await user.click(buttonIncrease);
    await user.click(buttonIncrease);

    const increasedCounterAmount = screen.getByText(/4/i);
    expect(increasedCounterAmount).toBeInTheDocument();

    await user.click(buttonCart);
    const defaultCounterAmount = screen.getByText(/1/i);
    expect(defaultCounterAmount).toBeInTheDocument();
  });
});
