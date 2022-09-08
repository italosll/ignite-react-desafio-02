import "@testing-library/jest-dom";
import {
  addItemToCart,
  decreaseItemAmount,
  increaseItemAmount,
  removeCartItem,
  resetCartItems,
} from "./CartActions";
import { cartReducer, CartState, Item } from "./CartReducer";

describe("CartReducer", () => {
  const item: Item = {
    amount: 1,
    availableAmount: 10,
    id: 1,
    image: "url/image",
    name: "coffe",
    price: 9.7,
    cartId: "@4543",
  };

  it("should add item", () => {
    let state: CartState = {
      cartItems: [],
    };
    jest.mock("uuid", () => {
      return {
        v4: jest.fn(() => 1),
      };
    });

    expect(state?.cartItems?.length).toBe(0);
    state = cartReducer(state, addItemToCart(item));
    expect(state?.cartItems?.length).toBe(1);
  });

  it("should increase item amount", () => {
    const amount = 1;

    let state: CartState = {
      cartItems: [item],
    };

    expect(state?.cartItems[0]?.amount).toBe(amount);
    state = cartReducer(state, increaseItemAmount(item!.cartId!));
    expect(state?.cartItems[0]?.amount).toBe(amount + 1);
  });

  it("should not increase item amount", () => {
    const amount = 1;

    let state: CartState = {
      cartItems: [{ ...item, amount, cartId: undefined }],
    };

    expect(state?.cartItems[0]?.amount).toBe(amount);
    state = cartReducer(state, increaseItemAmount(item!.cartId!));
    expect(state?.cartItems[0]?.amount).toBe(amount);
  });

  it("should decrease item amount", () => {
    const amount = 2;

    let state: CartState = {
      cartItems: [{ ...item, amount }],
    };

    expect(state?.cartItems[0]?.amount).toBe(amount);
    state = cartReducer(state, decreaseItemAmount(item!.cartId!));
    expect(state?.cartItems[0]?.amount).toBe(amount - 1);
  });

  it("should not decrease item amount", () => {
    const amount = 2;

    let state: CartState = {
      cartItems: [{ ...item, amount, cartId: undefined }],
    };

    expect(state?.cartItems[0]?.amount).toBe(amount);
    state = cartReducer(state, decreaseItemAmount(item!.cartId!));
    expect(state?.cartItems[0]?.amount).toBe(amount);
  });

  it("should remove cart item", () => {
    const id = 2;
    const cartId = "#2";

    let state: CartState = {
      cartItems: [item, { ...item, id, cartId }],
    };

    expect(state?.cartItems?.length).toBe(2);
    state = cartReducer(state, removeCartItem(cartId));
    expect(state?.cartItems?.length).toBe(1);
    expect(state?.cartItems?.[0]?.id).toBe(1);
  });

  it("should remove cart item", () => {
    const id = 2;
    const cartId = "#2";

    let state: CartState = {
      cartItems: [item, { ...item, id, cartId }],
    };

    expect(state?.cartItems?.length).toBe(2);
    state = cartReducer(state, resetCartItems());
    expect(state?.cartItems?.length).toBe(0);
  });

  it("should not trhow error when action is undefined", () => {
    let state: CartState = {
      cartItems: [],
    };

    let payload = {
      type: "UNDEFINED_ACTION",
    };

    expect(state?.cartItems?.length).toBe(0);
    state = cartReducer(state, payload);
    expect(state?.cartItems?.length).toBe(0);
  });
});
