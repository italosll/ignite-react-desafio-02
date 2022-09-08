import { useFormContext } from "react-hook-form";
import styled from "styled-components";

interface InputProps {
  name: string;
  label: string;
  maxWidth?: string;
  width?: string;
  isRequired?: boolean;
}

export const OPTIONAL_TEXT = "Opcional";
export const TEST_ID_ERROR_MESSAGE = "error-message";

export const Input = ({
  name,
  label,
  isRequired = true,
  width = "100%",
  maxWidth = "100%",
}: InputProps) => {
  const { register, formState } = useFormContext();

  const errorMessage = formState?.errors[name]?.message;

  return (
    <ContainerError maxWidth={maxWidth} width={width}>
      <ContainerLabel>
        <input placeholder=" " aria-label={label} {...register(name)} />
        <label>{label}</label>
        {!isRequired && <span>{OPTIONAL_TEXT}</span>}
      </ContainerLabel>
      {!!errorMessage && (
        <p data-testid={TEST_ID_ERROR_MESSAGE}>
          <>{errorMessage}</>
        </p>
      )}
    </ContainerError>
  );
};

interface ContainerInputProps {
  maxWidth: string;
  width: string;
}

const ContainerError = styled.div<ContainerInputProps>`
  max-width: ${({ maxWidth }) => maxWidth};
  width: ${({ width }) => width};
  color: ${({ theme }) => theme?.["error"]};
  display: flex;
  flex-direction: column;
`;

const ContainerLabel = styled.div`
  position: relative;
  width: 100%;

  & span {
    color: ${({ theme }) => theme?.["gray-label"]};
    font-style: italic;
    font-size: 0.75rem;
    margin-left: -62px;
  }

  & label {
    // important ones
    left: 0;
    top: 50%;
    position: absolute;
    transition: all 0.2s;
    transform-origin: left top;
    pointer-events: none;

    // NOT important props (Only custom properties)
    color: ${({ theme }) => theme?.["gray-label"]};
    transform: translateY(-50%);
    background: ${({ theme }) => theme?.["gray-input"]};
    font-size: 0.875rem;
    margin-left: 12px;
  }

  // NOT important props (Only custom properties)
  & input {
    font-size: 1rem;
    outline: none;
    padding: 12px;
    width: 100%;

    border-radius: 4px;
    color: ${({ theme }) => theme?.["gray-text"]};
    background: ${({ theme }) => theme?.["gray-input"]};
    border: 2px solid ${({ theme }) => theme?.["gray-button"]};

    & ::-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px red inset !important;
      background: ${({ theme }) => theme?.["gray-input"]};

      background-color: ${({ theme }) => theme?.["gray-input"]};
    }
  }

  // NOT important props (Only custom properties)
  & input:focus {
    border-color: ${({ theme }) => theme?.["yellow-dark"]};
  }

  // Apply on label when
  // -> input is focused
  // -> placeholder is not displayed
  & input:focus + label,
  input:not(:placeholder-shown) + label {
    // important ones
    top: 0;
    transform: translateY(-50%) scale(0.9);
    transition: all 0.2s;

    // NOT important props (Only custom properties)
    border-radius: 25px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 5px;
    background-image: ${({ theme }) =>
      `linear-gradient(
        ${theme?.["gray-card"]} 50%, 
        ${theme?.["gray-input"]} 50%
        )`};
  }

  // NOT important props (Only custom properties)
  & input:focus + label {
    color: ${({ theme }) => theme?.["yellow-dark"]};
  }
`;
