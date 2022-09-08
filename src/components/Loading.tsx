import { useContext } from "react";
import { SpinnerCircular } from "spinners-react";
import styled, { keyframes } from "styled-components";
import { ThemeContext } from "styled-components";
import { LoadingContext } from "../context/LoadingContext";

export const SVG_SPINNER_TITLE = "spinner-title";

export function Loading() {
  const theme = useContext(ThemeContext);
  const { isLoading } = useContext(LoadingContext);

  if (!isLoading) return <></>;

  return (
    <SpinnerContainer>
      <SpinnerCircular
        title={SVG_SPINNER_TITLE}
        size={200}
        color={theme?.["purple"]}
        secondaryColor={theme?.["gray-button"]}
      />
    </SpinnerContainer>
  );
}

const scale = keyframes`
  from {
    transform: scale(0.5);
  }

  to {
    transform: scale(1);
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  position: fixed;
  top: 0;
  z-index: 20;
  display: flex;
  justify-content: center;

  & svg {
    transition: all 0.5s ease-out;
    animation: ${scale} 1s ease-in-out;
  }
`;
