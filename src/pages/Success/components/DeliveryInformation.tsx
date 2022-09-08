import { CurrencyDollar, MapPin, Timer } from "phosphor-react";
import { ReactNode } from "react";
import styled from "styled-components";
import { IconBackground } from "../../../components/IconBackground";

interface DeliveryInformationProps {
  type: "location" | "remainingTime" | "paymentType";
  text: ReactNode;
  textMaxWidth: string;
}

const ICON_BACKGROUND = {
  purple: "purple",
  yellow: "yellow",
  "yellow-dark": "yellow-dark",
} as const;

export function DeliveryInformation({
  type,
  text,
  textMaxWidth,
}: DeliveryInformationProps) {
  const ICON_PROPS = {
    location: {
      icon: <MapPin size={15} weight="fill" />,
      background: ICON_BACKGROUND.purple,
    },
    remainingTime: {
      icon: <Timer size={15} weight="fill" />,
      background: ICON_BACKGROUND.yellow,
    },
    paymentType: {
      icon: <CurrencyDollar size={15} weight="fill" />,
      background: ICON_BACKGROUND["yellow-dark"],
    },
  } as const;

  const background = ICON_PROPS[type].background;
  const icon = ICON_PROPS[type].icon;

  return (
    <DeliveryInfo>
      <IconBackground background={background}>{icon}</IconBackground>
      <DeliveryTextContainer maxWidth={textMaxWidth}>
        {text}
      </DeliveryTextContainer>
    </DeliveryInfo>
  );
}

const DeliveryInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  color: ${({ theme }) => theme?.["gray-text"]};
`;

const DeliveryTextContainer = styled.div<{ maxWidth: string }>`
  display: flex;
  flex-direction: column;
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
`;
