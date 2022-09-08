import "@testing-library/jest-dom";
import {
  addItemToCart,
  CartActionTypes,
  decreaseItemAmount,
  increaseItemAmount,
  removeCartItem,
  resetCartItems,
} from "./CartActions";
import { Item } from "./CartReducer";

describe("CartActions", () => {
  const item: Item = {
    amount: 1,
    availableAmount: 10,
    id: 1,
    image: "url/image",
    name: "coffe",
    price: 9.7,
    cartId: "@4543",
  };

  it("should return correct add item to cart action", () => {
    const actionAddItemToCart = addItemToCart(item);

    expect(actionAddItemToCart.type).toBe(CartActionTypes.ADD_CART_ITEM);
    expect(actionAddItemToCart.payload.item).toBe(item);
  });

  it("should return correct increase item amount action", () => {
    const actionIncreaseItemAmount = increaseItemAmount(item!.cartId!);

    expect(actionIncreaseItemAmount.type).toBe(
      CartActionTypes.INCREASE_CART_ITEM_AMOUNT
    );
    expect(actionIncreaseItemAmount.payload.cartId).toBe(item!.cartId!);
  });

  it("should return correct decrease item amount action", () => {
    const actionDecreaseItemAmount = decreaseItemAmount(item!.cartId!);

    expect(actionDecreaseItemAmount.type).toBe(
      CartActionTypes.DECREASE_CART_ITEM_AMOUNT
    );
    expect(actionDecreaseItemAmount.payload.cartId).toBe(item!.cartId!);
  });

  it("should return correct remove item amount action", () => {
    const actionRemoveCartItem = removeCartItem(item!.cartId!);

    expect(actionRemoveCartItem.type).toBe(CartActionTypes.REMOVE_CART_ITEM);
    expect(actionRemoveCartItem.payload.cartId).toBe(item!.cartId!);
  });

  it("should return correct reset cart action", () => {
    const actionResetCartItems = resetCartItems();

    expect(actionResetCartItems.type).toBe(CartActionTypes.RESET_CART);
  });
});
