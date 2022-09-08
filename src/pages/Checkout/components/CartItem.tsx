import { Trash } from "phosphor-react";
import { useContext } from "react";

import styled from "styled-components";
import { Counter } from "../../../components/Counter";
import { CartContext } from "../../../context/CartContext";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  availableAmount: number;
  image: string;
  amount: number;
  cartId?: string | undefined;
}

export const TEST_ROLE_CART_ITEM_REMOVE_BUTTON = "Remover";

export function CartItem({
  name,
  price,
  image,
  amount,
  cartId,
  availableAmount,
}: CartItemProps) {
  const { decreaseAmount, increaseAmount, removeItem } =
    useContext(CartContext);

  function decreaseItemAmount() {
    decreaseAmount(cartId!);
  }

  function increaseItemAmount() {
    increaseAmount(cartId!);
  }

  function removeCartItem() {
    removeItem(cartId!);
  }

  return (
    <Container>
      <img src={image} alt="product image" />
      <ControlContainer>
        <span>{name}</span>

        <ControlRow>
          <Counter
            amount={amount}
            decreaseAmount={decreaseItemAmount}
            increaseAmount={increaseItemAmount}
          />

          <Button onClick={removeCartItem} type="button">
            <Trash size={16} />
            {TEST_ROLE_CART_ITEM_REMOVE_BUTTON}
          </Button>
        </ControlRow>
      </ControlContainer>
      <p>R$ {price}</p>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;

  & img {
    width: 64px;
    height: 64px;
    margin-right: 20px;
  }

  & p {
    color: ${({ theme }) => theme?.["gray-text"]};
    font-weight: 700;
    font-size: 1rem;
  }
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  color: ${({ theme }) => theme["gray-subtitle"]};
  font-size: 1rem;
  margin-right: auto;
`;

const Button = styled.button`
  text-transform: uppercase;
  border: none;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 4px;
  background: ${({ theme }) => theme?.["gray-button"]};
  padding: 8px;
  border-radius: 6px;
  color: ${({ theme }) => theme?.["gray-text"]};
  transition: all 0.2s ease-in-out;

  & svg {
    color: ${({ theme }) => theme?.["purple"]};
  }

  :hover {
    color: ${({ theme }) => theme?.["gray-subtitle"]};
    background: ${({ theme }) => theme?.["gray-hover"]};
    cursor: pointer;

    & svg {
      color: ${({ theme }) => theme?.["purple-dark"]};
    }
  }

  font-size: 0.75rem;
`;

const ControlRow = styled.div`
  display: flex;
  column-gap: 8px;
`;
