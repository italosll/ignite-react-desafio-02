import { render } from "@testing-library/react";
import { CartProvider } from "./CartContext";

describe("CartContext Provider Component", () => {
  it("should render CartContext Provider component", () => {
    render(
      <CartProvider>
        <></>
      </CartProvider>
    );
  });
});
