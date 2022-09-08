import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import styled from "styled-components";
import { COFFE_LIST } from "../../api/db";
import Background from "../../assets/home-background.svg";
import CoffeCup from "../../assets/images/coffe-cup.png";
import { device } from "../../styles/breakingpoints";
import { CoffeCard } from "./components/CoffeCard";

import { Information } from "./components/Information";

export function PageHome() {
  return (
    <>
      <HomeBackground>
        <BannerContainer>
          <PublicityMessageContainer>
            <h1>Encontre o café perfeito para qualquer hora do dia</h1>
            <span>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </span>
            <ContainerInformation>
              <Information
                background="yellow-dark"
                label="Compra simples e segura"
                icon={<ShoppingCart size={14} weight="fill" />}
              />
              <Information
                background="gray-text"
                label="Embalagem mantém o café intacto"
                icon={<Package size={14} weight="fill" />}
              />
              <Information
                background="yellow"
                label="Entrega rápida e rastreada"
                icon={<Timer size={14} weight="fill" />}
              />
              <Information
                background="purple"
                label="O café chega fresquinho até você"
                icon={<Coffee size={14} weight="fill" />}
              />
            </ContainerInformation>
          </PublicityMessageContainer>
          <img src={CoffeCup} />
        </BannerContainer>
      </HomeBackground>

      <CoffeListContainer>
        <h2>Nossos cafés</h2>
        <CoffeList>
          {COFFE_LIST?.coffe?.map((coffe) => (
            <CoffeCard key={coffe?.id} {...coffe} />
          ))}
        </CoffeList>
      </CoffeListContainer>
    </>
  );
}

const HomeBackground = styled.div`
  background-image: url(${Background});
  width: 100%;
  min-height: 544px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 30px 20px ${({ theme }) => theme?.["gray-background"]} inset;
`;
const BannerContainer = styled.div`
  width: fit-content;
  min-height: 544px;
  height: 100%;
  display: flex;
  gap: 56px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column-reverse;
  padding: 20px;

  & img {
    width: 100%;
    height: auto;
    max-width: 476px;
    max-height: 360px;
  }

  @media ${device.lg} {
    flex-direction: row;
  }
  @media ${device.xl} {
    padding: 0px;
  }
`;
const PublicityMessageContainer = styled.div`
  & h1 {
    max-width: 588px;
    font-size: 3rem;
    line-height: 1.3;
    color: ${({ theme }) => theme?.["gray-title"]};
  }
  & span {
    margin-top: 16px;
    display: flex;
    max-width: 588px;
    font-size: 1.25rem;
    line-height: 1.3;
    color: ${({ theme }) => theme?.["gray-subtitle"]};
  }
`;

const ContainerInformation = styled.div`
  width: 100%;
  max-width: 567px;
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 40px;
  margin-top: 66px;
`;
const CoffeListContainer = styled.div`
  margin-top: 32px;
  width: 1128px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 157px;
  padding: 20px;

  @media ${device.xl} {
    padding: 0px;
  }
`;

const CoffeList = styled.div`
  gap: 32px;
  width: 100%;
  max-width: 100%;
  margin-top: 54px;
  display: grid;
  justify-content: center;
  grid-template-columns: auto;

  @media ${device.md} {
    grid-template-columns: auto auto;
  }
  @media ${device.lg} {
    grid-template-columns: auto auto auto;
  }
  @media ${device.xl} {
    grid-template-columns: auto auto auto auto;
  }
`;
