import "@testing-library/jest-dom";
import { currencyFormatter } from "./helpers";

describe("helpers", () => {
  it("should return correct currency formated string", () => {
    const formatedValue = currencyFormatter(9);

    const expectedResult = "9,00";

    expect(formatedValue).toEqual(expectedResult);
  });
});
