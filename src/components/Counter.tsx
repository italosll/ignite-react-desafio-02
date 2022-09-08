import { Minus, Plus } from "phosphor-react";
import styled from "styled-components";

interface CounterProps {
  amount: number;
  increaseAmount: () => void;
  decreaseAmount: () => void;
  availableAmount?: number;
}

export const MAX_COUNTER_AMOUNT = 99;
export const DEFAULT_COUNTER_AMOUNT = 1;
export const TEST_ID_SVG_MINUS = "decrease-amount";
export const TEST_ID_SVG_PLUS = "increase-amount";

export function Counter({
  amount,
  increaseAmount,
  decreaseAmount,
  availableAmount = MAX_COUNTER_AMOUNT,
}: CounterProps) {
  function increase() {
    if (amount + 1 > availableAmount) return;
    increaseAmount();
  }

  function decrease() {
    if (amount - 1 < DEFAULT_COUNTER_AMOUNT) return;
    decreaseAmount();
  }

  return (
    <Container>
      <Minus data-testid={TEST_ID_SVG_MINUS} size={14} onClick={decrease} />
      <p>{amount}</p>
      <Plus data-testid={TEST_ID_SVG_PLUS} size={14} onClick={increase} />
    </Container>
  );
}
const Container = styled.div`
  color: ${({ theme }) => theme?.["gray-title"]};
  font-size: 1rem;
  background: ${({ theme }) => theme?.["gray-button"]};
  padding: 9px;
  border-radius: 6px;
  display: flex;
  gap: 4px;
  width: fit-content;
  align-items: center;
  height: 32px;

  & p {
    text-align: center;
    min-width: 20px;
    color: ${({ theme }) => theme?.["gray-title"]};
  }
  & svg {
    color: ${({ theme }) => theme?.purple};
    &:hover {
      transform: scale(1.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
  }
  & svg:hover {
    color: ${({ theme }) => theme?.["purple-dark"]};
    cursor: pointer;
  }
`;
