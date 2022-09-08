import {
  Counter,
  DEFAULT_COUNTER_AMOUNT,
  MAX_COUNTER_AMOUNT,
  TEST_ID_SVG_MINUS,
  TEST_ID_SVG_PLUS,
} from "./Counter";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";

function renderCounter(
  mockIncreaseAmount: jest.Mock<any, any>,
  mockDecreaseAmount: jest.Mock<any, any>,
  amount?: number
) {
  return render(
    <Counter
      amount={amount ?? DEFAULT_COUNTER_AMOUNT}
      decreaseAmount={mockDecreaseAmount}
      increaseAmount={mockIncreaseAmount}
    />
  );
}

describe("Counter Component", () => {
  const mockIncreaseAmount = jest.fn();
  const mockDecreaseAmount = jest.fn();

  const user = userEvent.setup();

  it("should display a counter with a default value", () => {
    renderCounter(mockIncreaseAmount, mockDecreaseAmount);
    const defaultValue = screen.getByText(DEFAULT_COUNTER_AMOUNT);

    expect(defaultValue).toBeInTheDocument();
  });

  it("should be able to call the increase function", async () => {
    renderCounter(mockIncreaseAmount, mockDecreaseAmount);
    const buttonIncrease = screen.getByTestId(TEST_ID_SVG_PLUS);

    expect(mockIncreaseAmount).toBeCalledTimes(0);

    await user.click(buttonIncrease);

    expect(mockIncreaseAmount).toBeCalledTimes(1);
  });

  it("should be able to call the decrease function", async () => {
    const AMOUNT = 10;
    renderCounter(mockIncreaseAmount, mockDecreaseAmount, AMOUNT);
    const buttonDecrease = screen.getByTestId(TEST_ID_SVG_MINUS);

    expect(mockDecreaseAmount).toBeCalledTimes(0);

    await user.click(buttonDecrease);

    expect(mockDecreaseAmount).toBeCalledTimes(1);
  });

  it("should not be able to call the decrease function", async () => {
    renderCounter(mockIncreaseAmount, mockDecreaseAmount);
    const buttonDecrease = screen.getByTestId(TEST_ID_SVG_MINUS);

    expect(mockDecreaseAmount).toBeCalledTimes(0);

    await user.click(buttonDecrease);

    expect(mockDecreaseAmount).toBeCalledTimes(0);
  });

  it("should not be able to call the increase function", async () => {
    renderCounter(mockIncreaseAmount, mockDecreaseAmount, MAX_COUNTER_AMOUNT);
    const buttonIncrease = screen.getByTestId(TEST_ID_SVG_PLUS);

    expect(mockIncreaseAmount).toBeCalledTimes(0);

    await user.click(buttonIncrease);

    expect(mockIncreaseAmount).toBeCalledTimes(0);
  });
});
