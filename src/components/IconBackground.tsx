import styled from "styled-components";
import { ReactNode } from "react";

export interface BackgroundProps {
  background: "purple" | "yellow" | "yellow-dark" | "gray-text";
}

interface IconBackgroundProps extends BackgroundProps {
  children: ReactNode;
}

export function IconBackground({ background, children }: IconBackgroundProps) {
  return (
    <IconWithBackground background={background}>{children}</IconWithBackground>
  );
}
const IconWithBackground = styled.div<BackgroundProps>`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 32px;
  background: ${({ theme, background }) => theme?.[background]};
  color: ${({ theme }) => theme?.["gray-white"]};
  display: flex;
  justify-content: center;
  align-items: center;
`;
