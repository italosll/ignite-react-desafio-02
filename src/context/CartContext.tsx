import { createContext, ReactNode, useEffect, useReducer } from "react";
import {
  addItemToCart,
  decreaseItemAmount,
  increaseItemAmount,
  removeCartItem,
  resetCartItems,
} from "./CartActions";
import { Item, cartReducer } from "./CartReducer";

interface CartProvider {
  cartItems: Item[];
  cartItemsAmount: number;
  addToCart: (item: Item) => void;
  increaseAmount: (cartId: string) => void;
  decreaseAmount: (cartId: string) => void;
  removeItem: (cartId: string) => void;
  resetCart: () => void;
}

interface ProviderProps {
  children: ReactNode;
  initialCartItemsAmount?: number;
  initialAddToCart?: () => void;
}

export const CartContext = createContext<CartProvider>({} as CartProvider);

export const reducerStateInitializer = (): { cartItems: any[] } => {
  const storedStateAsJSON = sessionStorage.getItem(
    "@ignite-coffe:cart-state-1.0.0"
  );
  if (storedStateAsJSON) {
    return JSON.parse(storedStateAsJSON);
  } else {
    return {
      cartItems: [],
    };
  }
};

export function CartProvider({
  children,
  initialCartItemsAmount,
}: ProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      cartItems: [],
    },
    () => reducerStateInitializer()
  );

  useEffect(() => {
    if (cartState) {
      const stateJSON = JSON.stringify(cartState);
      sessionStorage.setItem("@ignite-coffe:cart-state-1.0.0", stateJSON);
    }
  }, [cartState]);

  const cartItems = cartState?.cartItems;
  const cartItemsAmount =
    initialCartItemsAmount ?? cartState?.cartItems?.length ?? 0;

  function addToCart(item: Item) {
    dispatch(addItemToCart(item));
  }

  function increaseAmount(cartId: string) {
    dispatch(increaseItemAmount(cartId));
  }

  function decreaseAmount(cartId: string) {
    dispatch(decreaseItemAmount(cartId));
  }

  function removeItem(cartId: string) {
    dispatch(removeCartItem(cartId));
  }

  function resetCart() {
    dispatch(resetCartItems());
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartItemsAmount,
        addToCart,
        increaseAmount,
        decreaseAmount,
        removeItem,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
