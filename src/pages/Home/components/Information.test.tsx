import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Information } from "./Information";
import { ShoppingCart } from "phosphor-react";

describe("Information Component", () => {
  it("should render the information component", () => {
    render(
      <Information background="yellow" icon={<ShoppingCart />} label="label" />
    );
  });
});
