import Logo from "../assets/coffe-delivery-logo.svg";
import { MapPin, ShoppingCart } from "phosphor-react";
import styled from "styled-components";
import { device } from "../styles/breakingpoints";
import { useNavigate } from "react-router-dom";
import { URL_CHECKOUT, URL_HOME } from "../Router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const AMOUNT_TITLE = "amount-title";

export function Navbar() {
  const navigate = useNavigate();
  const { cartItemsAmount } = useContext(CartContext);

  return (
    <>
      <Padding />
      <NavbarBackground>
        <Container>
          <img src={Logo} onClick={() => navigate(URL_HOME)} />
          <LocationAndCartContainer>
            <Location>
              <MapPin size={22} weight="fill" />
              Porteirão, GO
            </Location>
            <CartIcon onClick={() => navigate(URL_CHECKOUT)}>
              {!!cartItemsAmount && (
                <Amount title={AMOUNT_TITLE}>{cartItemsAmount}</Amount>
              )}
              <ShoppingCart size={22} weight="fill" />
            </CartIcon>
          </LocationAndCartContainer>
        </Container>
      </NavbarBackground>
    </>
  );
}

const NavbarBackground = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  background: ${({ theme }) => theme["gray-background"]};
`;

const Padding = styled.div`
  height: 6.5rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1128px;
  left: 0px;
  right: 0px;
  margin-left: auto;
  margin-right: auto;
  height: 6.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  @media ${device.xl} {
    padding-left: 0px;
    padding-right: 0px;
  }

  & img {
    :hover {
      cursor: pointer;
    }
  }
`;

const LocationAndCartContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  background: ${(props) => props?.theme?.["purple-light"]};
  color: ${(props) => props?.theme?.["purple"]};
  padding: 10px;
`;

const CartIcon = styled.div`
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  color: ${(props) => props?.theme?.["yellow-dark"]};
  background: ${(props) => props?.theme?.["yellow-light"]};

  :hover {
    cursor: pointer;
  }
`;

const Amount = styled.span`
  color: ${(props) => props?.theme?.["gray-white"]};
  background: ${(props) => props?.theme?.["yellow-dark"]};
  border-radius: 25px;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  display: flex;
  line-height: 20px;
  padding-top: 2px;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-left: 20px;
  margin-bottom: 40px;
`;
