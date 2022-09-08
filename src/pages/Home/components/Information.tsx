import { ReactNode } from "react";
import styled from "styled-components";
import {
  BackgroundProps,
  IconBackground,
} from "../../../components/IconBackground";

interface InformationProps extends BackgroundProps {
  icon: ReactNode;
  label: string;
}

export function Information({ label, background, icon }: InformationProps) {
  return (
    <InformationContainer>
      <IconBackground background={background}>{icon}</IconBackground>
      {label}
    </InformationContainer>
  );
}

const InformationContainer = styled.div`
  color: ${({ theme }) => theme?.["gray-text"]};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 231px;
`;
