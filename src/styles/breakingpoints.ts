const sizes = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

type DeviceSizes = typeof sizes;

/**
 * Represents a size.
 * @property sm: "30em",
 * @property md: "48em",
 * @property lg: "62em",
 * @property xl: "80em",
 * @property "2xl": "96em",
 */
export const device: DeviceSizes = {
  sm: `(min-width: ${sizes.sm})`,
  md: `(min-width: ${sizes.md})`,
  lg: `(min-width: ${sizes.lg})`,
  xl: `(min-width: ${sizes.xl})`,
  "2xl": `(min-width: ${sizes["2xl"]})`,
};
