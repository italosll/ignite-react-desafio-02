export const PATTERN_CEP = {
  required: "required",
  pattern: {
    value: /^([\d]{2})([\d]{3})\-([\d]{3})$/,
    message: "CEP inválido",
  },
};
