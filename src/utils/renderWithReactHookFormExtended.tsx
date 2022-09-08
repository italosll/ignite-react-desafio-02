import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import { render } from "@testing-library/react";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";

// this coment exists only beacause this is an study project
// font:https://javascript.plainenglish.io/using-react-hook-form-in-component-tests-497180abf3c0

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
