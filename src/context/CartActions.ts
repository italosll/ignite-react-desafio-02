import { Item } from "./CartReducer";

export enum CartActionTypes {
  ADD_CART_ITEM = "ADD_CART_ITEM",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
  INCREASE_CART_ITEM_AMOUNT = "INCREASE_CART_ITEM_AMOUNT",
  DECREASE_CART_ITEM_AMOUNT = "DECREASE_CART_ITEM_AMOUNT",
  FINISH_ORDER = "FINISH_ORDER",
  RESET_CART = "RESET_CART",
}

export function addItemToCart(item: Item) {
  return {
    type: CartActionTypes.ADD_CART_ITEM,
    payload: {
      item,
    },
  };
}

export function increaseItemAmount(cartId: string) {
  return {
    type: CartActionTypes.INCREASE_CART_ITEM_AMOUNT,
    payload: {
      cartId,
    },
  };
}

export function decreaseItemAmount(cartId: string) {
  return {
    type: CartActionTypes.DECREASE_CART_ITEM_AMOUNT,
    payload: {
      cartId,
    },
  };
}

export function removeCartItem(cartId: string) {
  return {
    type: CartActionTypes.REMOVE_CART_ITEM,
    payload: {
      cartId,
    },
  };
}

export function resetCartItems() {
  return {
    type: CartActionTypes.RESET_CART,
  };
}
