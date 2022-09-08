import { MapPin } from "phosphor-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled, { DefaultTheme, ThemeProps } from "styled-components";
import DeliveringCoffe from "../../assets/images/delivering-coffe.png";
import { device } from "../../styles/breakingpoints";
import { OrderCoffeeFormData } from "../Checkout/PageCheckout";
import { DeliveryInformation } from "./components/DeliveryInformation";

export const MIN_AWAITING_TIME = 10;

interface FormatRemainingTimeProps {
  minAwaitingTime: number | string;
  maxAwaitingTime: number | string;
}
export const formatRemainingTime = ({
  minAwaitingTime,
  maxAwaitingTime,
}: FormatRemainingTimeProps) => {
  return `${minAwaitingTime} min - ${maxAwaitingTime} min`;
};

export interface LocationState extends OrderCoffeeFormData {
  deliveryTimePrevision: string;
}

export function PageSuccess() {
  let location = useLocation();

  const orderData = location?.state as LocationState;

  return (
    <PageContainer>
      <ConfirmedOrderContainer>
        <h1>Uhu! Pedido confirmado</h1>
        <span>Agora é só aguardar que logo o café chegará até você</span>

        <DeliveryContainer>
          <DeliveryInformation
            textMaxWidth="310px"
            type="location"
            text={
              <>
                Entrega em
                <strong>
                  {orderData?.street}, {orderData?.number}
                </strong>
                {orderData?.neighborhood} - {orderData?.city}, {orderData?.uf}
              </>
            }
          />
          <DeliveryInformation
            textMaxWidth="141px"
            type="remainingTime"
            text={
              <>
                Previsão de entrega
                <strong>
                  {formatRemainingTime({
                    minAwaitingTime: MIN_AWAITING_TIME,
                    maxAwaitingTime: orderData?.deliveryTimePrevision,
                  })}
                </strong>
              </>
            }
          />
          <DeliveryInformation
            textMaxWidth="162px"
            type="paymentType"
            text={
              <>
                Pagamento na entrega <strong>{orderData?.paymentType} </strong>
              </>
            }
          />
        </DeliveryContainer>
      </ConfirmedOrderContainer>
      <img src={DeliveringCoffe} />
    </PageContainer>
  );
}

const DeliveryContainer = styled.div`
  max-width: 526px;
  width: 100%;
  height: auto;
  margin-top: 40px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  border: 1px solid #0000; // Important !!!
  border-radius: 6px 36px;
  background: ${({ theme }) =>
    `linear-gradient(
    ${theme?.["gray-background"]}, 
    ${theme?.["gray-background"]}) 
    padding-box,
    linear-gradient(
      ${theme?.yellow}, 
      ${theme?.purple}) 
      border-box`};
`;

const PageContainer = styled.div`
  width: 1128px;
  max-width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  margin-left: auto;
  flex-direction: column;
  margin-right: auto;
  box-sizing: border-box;
  justify-content: space-between;

  & img {
    width: 100%;
    max-width: 492px;
    max-height: 293px;
    height: auto;
    margin-top: auto;
    margin-left: auto;
  }

  @media ${device.xl} {
    flex-direction: row;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

const ConfirmedOrderContainer = styled.div`
  margin-top: 80px;

  & h1 {
    font-size: 2rem;
    color: ${({ theme }) => theme?.["yellow-dark"]};
  }
  & span {
    font-size: 1.25rem;
  }
`;
