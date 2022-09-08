import { createContext, ReactNode, useEffect, useState } from "react";

interface LoadingProps {
  displayLoading: () => void;
  isLoading: boolean;
}

export const LoadingContext = createContext({} as LoadingProps);

interface LoadingProviderProps {
  children: ReactNode;
  isLoadingInitialValue?: boolean;
}

export const LOADING_VISIBLE_INTERVAL_IN_MILISECONDS = 2000;

export function LoadingProvider({
  children,
  isLoadingInitialValue,
}: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(isLoadingInitialValue ?? false);

  const hideLoading = () => setIsLoading(false);
  const displayLoading = () => setIsLoading(true);

  useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined;

    if (isLoading) {
      interval = setInterval(() => {
        hideLoading();
      }, LOADING_VISIBLE_INTERVAL_IN_MILISECONDS);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <LoadingContext.Provider
      value={{
        displayLoading,
        isLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
