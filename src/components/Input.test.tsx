import { render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Input, OPTIONAL_TEXT, TEST_ID_ERROR_MESSAGE } from "./Input";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { act } from "react-dom/test-utils";

interface WrapperProps {
  children: ReactNode | ReactNode[];
}

export function renderWithReactHookForm(
  form: ReactElement<any, string | JSXElementConstructor<any>>,
  { defaultValues = {} } = {}
) {
  let reactHookFormProps: UseFormReturn<any, any> = {} as UseFormReturn<
    any,
    any
  >;

  const Wrapper = ({ children }: WrapperProps) => {
    const formProps = useForm({ defaultValues });

    reactHookFormProps = formProps;

    return <FormProvider {...formProps}>{children}</FormProvider>;
  };

  return {
    ...render(form, { wrapper: Wrapper }),
    reactHookFormProps,
  };
}

describe("Input Component", () => {
  const INPUT_NAME = "test";
  const INPUT_LABEL = "label";
  const inputProps = { name: INPUT_NAME, label: INPUT_LABEL };

  it("should not contain the optional span", () => {
    renderWithReactHookForm(<Input {...inputProps} />);

    const optionalSpan = screen.queryByText(OPTIONAL_TEXT);

    expect(optionalSpan).not.toBeInTheDocument();
  });

  it("should contain the optional span", () => {
    renderWithReactHookForm(<Input {...inputProps} isRequired={false} />);

    const optionalSpan = screen.queryByText(OPTIONAL_TEXT);

    expect(optionalSpan).toBeInTheDocument();
  });

  it("should display error message", async () => {
    const mockHandleSubmit = jest.fn();
    const TEXT_ERROR_MESSAGE = "Campo obrigatório";

    const { reactHookFormProps } = renderWithReactHookForm(
      <Input {...inputProps} />
    );

    act(() => {
      reactHookFormProps.setError("test", {
        message: TEXT_ERROR_MESSAGE,
        type: "required",
      });
    });

    reactHookFormProps.handleSubmit(mockHandleSubmit);

    await waitFor(() => {
      const errorMessageParagraph = screen.getByText(TEXT_ERROR_MESSAGE);
      expect(errorMessageParagraph).toBeInTheDocument();
    });
  });

  it("should not display error message", async () => {
    const mockHandleSubmit = jest.fn();

    const { reactHookFormProps } = renderWithReactHookForm(
      <Input {...inputProps} />
    );

    reactHookFormProps.handleSubmit(mockHandleSubmit);

    await waitFor(() => {
      const errorMessageParagraph = screen.queryByTestId(TEST_ID_ERROR_MESSAGE);
      expect(errorMessageParagraph).not.toBeInTheDocument();
    });
  });
});
