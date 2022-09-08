import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from "phosphor-react";
import { useContext, useState } from "react";
import styled from "styled-components";
import { Input } from "../../components/Input";
import { CartContext } from "../../context/CartContext";
import { device } from "../../styles/breakingpoints";
import { CartItem } from "./components/CartItem";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { currencyFormatter } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { URL_SUCCESS } from "../../Router";
import {
  LoadingContext,
  LOADING_VISIBLE_INTERVAL_IN_MILISECONDS,
} from "../../context/LoadingContext";

export const ERROR_MESSAGE_PAYMENT_TYPE = "Informe uma forma de pagamento";

export enum paymentType {
  CREDIT_CARD = "Cartão de crédito",
  DEBIT_CARD = "Cartão de débito",
  MONEY = "Dinheiro",
}

export const TEST_PAYMENT_TYPE_SELECTED = "selected";
export const TEST_PAYMENT_TYPE_NOT_SELECTED = "not-selected";

export const TEST_ROLE_BUTTON_CREDIT_CARD = "Cartão de crédito";
export const TEST_TEXT_BUTTON_CONFIRM_ORDER = "Confirmar Pedido";

export const TEST_LABEL_INPUT_CEP = "CEP";
export const TEST_LABEL_INPUT_STREET = "Rua";
export const TEST_LABEL_INPUT_NUMBER = "Número";
export const TEST_LABEL_INPUT_COMPLEMENT = "Complemento";
export const TEST_LABEL_INPUT_NEIGHBORHOOD = "Bairro";
export const TEST_LABEL_INPUT_CITY = "Cidade";
export const TEST_LABEL_INPUT_UF = "UF";

const orderCoffeeValidationSchema = zod.object({
  cep: zod.string().min(1, "Informe o CEP"),
  street: zod.string().min(1, "Informe a Rua"),
  number: zod.string().min(1, "Informe o Número"),
  complement: zod.string().optional(),
  neighborhood: zod.string().min(1, "Informe o Bairro"),
  city: zod.string().min(1, "Informe a Cidade"),
  uf: zod.string().min(1, "Informe a UF"),
  paymentType: zod.enum(
    [paymentType?.CREDIT_CARD, paymentType?.DEBIT_CARD, paymentType?.MONEY],
    {
      required_error: ERROR_MESSAGE_PAYMENT_TYPE,
    }
  ),
});

export type OrderCoffeeFormData = zod.infer<typeof orderCoffeeValidationSchema>;

export function PageCheckout() {
  const DELIVERY_TAX = 15;

  const { displayLoading } = useContext(LoadingContext);

  const { cartItems, resetCart } = useContext(CartContext);
  const navigate = useNavigate();

  const orderForm = useForm<OrderCoffeeFormData>({
    resolver: zodResolver(orderCoffeeValidationSchema),
    defaultValues: {
      cep: "",
      city: "",
      neighborhood: "",
      complement: "",
      number: "",
      paymentType: undefined,
      street: "",
      uf: "",
    },
    shouldFocusError: true,
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset: resetForm,
    setValue,
    resetField,
    formState,
    clearErrors,
    setError,
  } = orderForm;

  const [selectedPayment, setSelectedPayment] = useState<
    undefined | paymentType
  >();

  const getIsSelectedValue = (isPaymentTypeSelected: boolean): string => {
    return isPaymentTypeSelected
      ? TEST_PAYMENT_TYPE_SELECTED
      : TEST_PAYMENT_TYPE_NOT_SELECTED;
  };

  const isCreditCardSelected: string = getIsSelectedValue(
    selectedPayment === paymentType?.CREDIT_CARD
  );

  const isDebitCardSelected: string = getIsSelectedValue(
    selectedPayment === paymentType?.DEBIT_CARD
  );

  const isMoneySelected: string = getIsSelectedValue(
    selectedPayment === paymentType?.MONEY
  );

  let totalPriceByItem = [];
  let totalPrice = 0;

  if (cartItems?.length > 0) {
    totalPriceByItem = cartItems?.map((item) => item?.price * item?.amount);
    totalPrice = totalPriceByItem?.reduce((acc, current) => acc + current);
  }

  const paymentTypeErrorMessage = formState?.errors["paymentType"]?.message;

  const resetPaymentTypeValue = () => {
    resetField("paymentType");
    setSelectedPayment(undefined);
    setError(
      "paymentType",
      { type: "required", message: ERROR_MESSAGE_PAYMENT_TYPE },
      { shouldFocus: true }
    );
  };

  const definePaymentType = (paymentSelected: paymentType) => {
    setSelectedPayment(paymentSelected);
    setValue("paymentType", paymentSelected);
    clearErrors("paymentType");
  };

  const togglePaymentType = (paymentSelected: paymentType) => {
    if (selectedPayment === paymentSelected) {
      resetPaymentTypeValue();
    } else {
      definePaymentType(paymentSelected);
    }
  };

  //https://stackoverflow.com/questions/70089850/testing-a-function-which-has-a-promise-and-settimeout-why-is-it-timing-out

  async function handleOrderCoffe(data: OrderCoffeeFormData) {
    console.log(data);
    displayLoading();

    return setTimeout(() => {
      resetCart();
      resetForm();

      navigate(URL_SUCCESS, {
        replace: true,
        state: {
          ...data,
          deliveryTimePrevision: 30,
        },
      });
    }, 1500);
  }

  return (
    <Form onSubmit={handleSubmit(handleOrderCoffe)} action="">
      <AddressAndPaymentContainer>
        <h3>Complete seu pedido</h3>

        <AddressSection>
          <FlexRow>
            <MapPinLine size={22} />
            <FlexColumn>
              <Title>Endereço de Entrega</Title>
              <Description>
                Informe o endereço onde deseja receber seu pedido
              </Description>
            </FlexColumn>
          </FlexRow>
          <InputsContainer>
            <FormProvider {...orderForm}>
              <Input name="cep" label={TEST_LABEL_INPUT_CEP} width="40%" />
              <Input
                name="street"
                label={TEST_LABEL_INPUT_STREET}
                width="100%"
              />
              <Input
                name="number"
                label={TEST_LABEL_INPUT_NUMBER}
                width="calc(40% - 6px)"
              />
              <Input
                name="complement"
                label={TEST_LABEL_INPUT_COMPLEMENT}
                width="calc(60% - 6px)"
                isRequired={false}
              />
              <Input
                name="neighborhood"
                label={TEST_LABEL_INPUT_NEIGHBORHOOD}
                width="calc(40% - 8px)"
              />
              <Input
                name="city"
                label={TEST_LABEL_INPUT_CITY}
                width="calc(45% - 8px)"
              />
              <Input
                name="uf"
                label={TEST_LABEL_INPUT_UF}
                width="calc(15% - 8px)"
              />
            </FormProvider>
          </InputsContainer>
        </AddressSection>
        <PaymentSection>
          <FlexRow>
            <CurrencyDollar size={22} />
            <FlexColumn>
              <Title>Pagamento</Title>
              <Description>
                O pagamento é feito na entrega. Escolha a forma que deseja pagar
              </Description>
            </FlexColumn>
          </FlexRow>
          <PaymentTypes>
            <PaymentType
              onClick={() => togglePaymentType(paymentType?.CREDIT_CARD)}
              value={isCreditCardSelected}
            >
              <CreditCard size={16} />
              {TEST_ROLE_BUTTON_CREDIT_CARD}
            </PaymentType>
            <PaymentType
              onClick={() => togglePaymentType(paymentType?.DEBIT_CARD)}
              value={isDebitCardSelected}
            >
              <Bank size={16} />
              Cartão de débito
            </PaymentType>
            <PaymentType
              onClick={() => togglePaymentType(paymentType?.MONEY)}
              value={isMoneySelected}
            >
              <Money size={16} />
              Dinheiro
            </PaymentType>
          </PaymentTypes>
          {!!paymentTypeErrorMessage && (
            <p>
              <>{paymentTypeErrorMessage}</>
            </p>
          )}
        </PaymentSection>
      </AddressAndPaymentContainer>

      <OrderContainer>
        <h3>Cafés selecionados</h3>
        <CartSection>
          {cartItems?.map((cartItem) => {
            return <CartItem key={cartItem?.cartId} {...cartItem} />;
          })}

          <Divider />
          <PriceContainer>
            <PriceItem>
              <span>Total de itens</span>
              <span>R$ {currencyFormatter(totalPrice)}</span>
            </PriceItem>

            <PriceItem>
              <span>Entrega</span>
              <span>R$ {currencyFormatter(DELIVERY_TAX)}</span>
            </PriceItem>
            <PriceItem>
              <h2>Total</h2>
              <h2>R$ {currencyFormatter(totalPrice + DELIVERY_TAX)}</h2>
            </PriceItem>
          </PriceContainer>
          <Button type="submit">{TEST_TEXT_BUTTON_CONFIRM_ORDER}</Button>
        </CartSection>
      </OrderContainer>
    </Form>
  );
}

const Form = styled.form`
  margin-top: 32px;
  width: 1128px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 157px;
  gap: 32px;
  padding-left: 20px;
  padding-right: 20px;

  & h3 {
    font-size: 1.125rem;
  }

  @media ${device.lg} {
    flex-direction: row;
    padding-left: 0px;
    padding-right: 0px;
  }
`;
const AddressAndPaymentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  @media ${device.lg} {
    width: 60%;
  }
`;

const OrderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  @media ${device.lg} {
    width: 40%;
  }
`;

const Card = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme?.["gray-card"]};
  border-radius: 6px;

  @media ${device.lg} {
    padding: 40px;
  }
`;

const Title = styled.p`
  color: ${({ theme }) => theme?.["gray-subtitle"]};
  font-size: 1rem;
`;

const Description = styled.p`
  margin-bottom: 32px;
  color: ${({ theme }) => theme?.["gray-subtitle"]};
  font-size: 0.875rem;
`;

const AddressSection = styled(Card)`
  & svg {
    color: ${({ theme }) => theme?.["yellow-dark"]};
    margin-right: 8px;
  }
`;

const PaymentSection = styled(Card)`
  color: ${({ theme }) => theme?.["error"]};
  & svg {
    color: ${({ theme }) => theme?.["purple-dark"]};
    margin-right: 8px;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 12px;
  row-gap: 16px;
  max-width: 100%;
  box-sizing: border-box;
`;

const FlexRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const FlexColumn = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
`;

const PaymentTypes = styled(FlexColumn)`
  gap: 12px;

  @media ${device.lg} {
    flex-direction: row;
  }
`;

interface PaymentTypeProps {
  isSelected: boolean;
}

const PaymentType = styled.button.attrs({ type: "button" })`
  width: 100%;
  padding: 16px;
  font-size: 0.75rem;
  display: flex;
  row-gap: 12px;
  flex-direction: row;
  user-select: none;
  border: 1px solid;
  border-radius: 6px;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  border-color: ${({ theme, value }) =>
    value === TEST_PAYMENT_TYPE_SELECTED
      ? theme?.["purple"]
      : theme?.["gray-button"]};
  background: ${({ theme, value }) =>
    value === TEST_PAYMENT_TYPE_SELECTED
      ? theme?.["purple-light"]
      : theme?.["gray-button"]};
  color: ${({ theme }) => theme?.["gray-text"]};

  :hover {
    background: ${({ theme }) => theme?.["gray-hover"]};
    cursor: pointer;
  }

  & svg {
    color: ${({ theme }) => theme?.["purple"]};
  }
`;

const CartSection = styled(Card)`
  width: 100%;
  border-radius: 6px 44px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme?.["gray-button"]};
`;

const PriceContainer = styled(FlexColumn)`
  row-gap: 12px;
`;

const PriceItem = styled(FlexRow)`
  justify-content: space-between;
  color: ${({ theme }) => theme?.["gray-text"]};
  font-size: 1rem;

  & h2 {
    color: ${({ theme }) => theme?.["gray-subtitle"]};
    font-size: 1.25rem;
    font-family: "Roboto";
    font-weight: bold;
  }
`;

const Button = styled.button`
  width: "100%";
  text-transform: uppercase;
  border: none;
  font-weight: 700;
  background: ${({ theme }) => theme?.["yellow"]};
  padding: 12px;
  border-radius: 6px;
  color: ${({ theme }) => theme?.["gray-white"]};
  transition: all 0.2s ease-in-out;
  :hover {
    background: ${({ theme }) => theme?.["yellow-dark"]};
    cursor: pointer;
  }

  font-size: 0.875rem;
`;
