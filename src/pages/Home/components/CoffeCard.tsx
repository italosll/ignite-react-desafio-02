import { ShoppingCart } from "phosphor-react";
import styled from "styled-components";
import { Counter } from "../../../components/Counter";
import Coffe from "../../../assets/images/coffe/expresso-tradicional.png";
import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { currencyFormatter } from "../../../utils/helpers";

export interface Coffe {
  id: number;
  badges: string[];
  name: string;
  description: string;
  price: number;
  availableAmount: number;
  image: string;
}

export const TEST_ID_COFFE_CARD_CART_ICON = "cart-icon";

export function CoffeCard({
  availableAmount,
  badges,
  name,
  description,
  price,
  image,
  id,
}: Coffe) {
  const { addToCart } = useContext(CartContext);
  const [amount, setAmount] = useState(1);

  const increaseAmount = () => {
    setAmount((prev) => prev + 1);
  };

  const decreaseAmount = () => {
    setAmount((prev) => prev - 1);
  };

  const resetAmount = () => {
    setAmount(1);
  };

  function handleAddToCart() {
    addToCart({
      id: id,
      price: price,
      amount: amount,
      image: image,
      name: name,
      availableAmount: availableAmount,
    });
    resetAmount();
  }

  return (
    <Card>
      <img src={image} />
      <Badges>
        {badges?.map((badge) => (
          <Badge key={badge}>{badge}</Badge>
        ))}
      </Badges>
      <h3>{name}</h3>
      <span>{description}</span>
      <footer>
        <span>R$</span>
        <h2>{currencyFormatter(price)}</h2>

        <Counter
          amount={amount}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
        />
        <CartBackground
          data-testid={TEST_ID_COFFE_CARD_CART_ICON}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} weight="fill" />
        </CartBackground>
      </footer>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ theme }) => theme?.["gray-card"]};

  gap: 4px;
  width: 256px;
  height: 310px;
  border-radius: 6px 36px;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 0px;

  & img {
    margin-top: -20px;
  }

  & h3 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme?.["gray-subtitle"]};
    margin-top: 16px;
    line-height: 1.625rem;
  }

  & span {
    margin-top: 8px;
    font-size: 0.875rem;
    color: ${({ theme }) => theme?.["gray-label"]};
    text-align: center;
    line-height: 18px;
  }
  & footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    max-height: 38px;
    box-sizing: border-box;

    width: 100%;
  }
  & footer > span {
    font-size: 0.875rem;
    color: ${({ theme }) => theme?.["gray-text"]};
    height: 23px;
    margin-right: -6px;
  }
  & h2 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme?.["gray-text"]};
    margin-right: auto;
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  margin-top: 12px;
  justify-content: center;
`;

const Badge = styled.p`
  background: ${({ theme }) => theme?.["yellow-light"]};
  color: ${({ theme }) => theme?.["yellow-dark"]};
  text-transform: uppercase;
  font-size: 0.625rem;
  padding: 4px 8px;
  border-radius: 25px;
  font-weight: 700;
  width: fit-content;
`;

const CartBackground = styled.button`
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme?.["gray-white"]};
  background: ${({ theme }) => theme?.["purple"]};
  border: none;

  &:hover {
    background: ${({ theme }) => theme?.["purple-dark"]};
    transform: scale(1.1);
    transition: all 0.2s linear;
    cursor: pointer;
  }
`;
