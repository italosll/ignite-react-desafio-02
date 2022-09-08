import produce from "immer";
import { CartActionTypes } from "./CartActions";
// import * as uuid from "uuid";

import { v4 as uuid } from "uuid";

export interface Item {
  id: number;
  cartId?: string;
  image: string;
  amount: number;
  price: number;
  name: string;
  availableAmount: number;
}

export interface CartState {
  cartItems: Item[];
}

export function cartReducer(state: CartState, action: any): CartState {
  const getCurrentItemIndex = (cartId: string) =>
    state?.cartItems?.findIndex((item) => item.cartId === cartId);

  switch (action.type) {
    case CartActionTypes.ADD_CART_ITEM: {
      return produce(state, (draft) => {
        draft.cartItems.push({ ...action.payload.item, cartId: uuid() });
      });
    }

    case CartActionTypes.INCREASE_CART_ITEM_AMOUNT: {
      const itemIndex = getCurrentItemIndex(action.payload.cartId);

      if (itemIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cartItems[itemIndex].amount += 1;
      });
    }

    case CartActionTypes.DECREASE_CART_ITEM_AMOUNT: {
      const itemIndex = getCurrentItemIndex(action.payload.cartId);

      if (itemIndex < 0) return state;

      return produce(state, (draft) => {
        draft.cartItems[itemIndex].amount -= 1;
      });
    }

    case CartActionTypes.REMOVE_CART_ITEM: {
      return produce(state, (draft) => {
        draft.cartItems = draft.cartItems.filter(
          (item) => item.cartId !== action.payload.cartId
        );
      });
    }

    case CartActionTypes.RESET_CART: {
      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
}
