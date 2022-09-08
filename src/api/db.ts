import EX_tradicional from "../assets/images/coffe/expresso-tradicional.png";
import EX_americano from "../assets/images/coffe/expresso-americano.png";
import EX_cremoso from "../assets/images/coffe/expresso-cremoso.png";
import EX_gelado from "../assets/images/coffe/expresso-gelado.png";

import cafe_com_leite from "../assets/images/coffe/cafe-com-leite.png";
import latte from "../assets/images/coffe/latte.png";
import capuccino from "../assets/images/coffe/capuccino.png";
import macchiato from "../assets/images/coffe/macchiato.png";

import mocaccino from "../assets/images/coffe/mocaccino.png";
import chocolate_quente from "../assets/images/coffe/chocolate-quente.png";
import cubano from "../assets/images/coffe/cubano.png";
import havaiano from "../assets/images/coffe/havaiano.png";

import arabe from "../assets/images/coffe/arabe.png";
import irlandes from "../assets/images/coffe/irlandes.png";

export const COFFE_LIST = {
  coffe: [
    {
      id: 1,
      badges: ["tradicional"],
      name: "Expresso Tradicional",
      description: "O tradicional café feito com água quente e grãos moídos",
      price: 99.99,
      availableAmount: 10,
      image: EX_tradicional,
    },
    {
      id: 2,
      badges: ["tradicional"],
      name: "Expresso Americano",
      description: "Expresso diluído, menos intenso que o tradicional",
      price: 9.9,
      availableAmount: 10,
      image: EX_americano,
    },
    {
      id: 3,
      badges: ["tradicional"],
      name: "Expresso Cremoso",
      description: "Café expresso tradicional com espuma cremosa",
      price: 9.9,
      availableAmount: 10,
      image: EX_cremoso,
    },
    {
      id: 4,
      badges: ["tradicional", "gelado"],
      name: "Expresso Gelado",
      description: "Bebida preparada com café expresso e cubos de gelo",
      price: 9.9,
      availableAmount: 10,
      image: EX_gelado,
    },
    {
      id: 5,
      badges: ["tradicional", "com leite"],
      name: "Café com Leite",
      description: "Meio a meio de expresso tradicional com leite vaporizado",
      price: 9.9,
      availableAmount: 10,
      image: cafe_com_leite,
    },
    {
      id: 6,
      badges: ["tradicional", "com leite"],
      name: "Latte",
      description:
        "Uma dose de café expresso com o dobro de leite e espuma cremosa",
      price: 9.9,
      availableAmount: 10,
      image: latte,
    },
    {
      id: 7,
      badges: ["tradicional", "com leite"],
      name: "Capuccino",
      description:
        "Bebida com canela feita de doses iguais de café, leite e espuma",
      price: 9.9,
      availableAmount: 10,
      image: capuccino,
    },
    {
      id: 8,
      badges: ["tradicional", "com leite"],
      name: "Macchiato",
      description:
        "Café expresso misturado com um pouco de leite quente e espuma",
      price: 9.9,
      availableAmount: 10,
      image: macchiato,
    },
    {
      id: 9,
      badges: ["tradicional", "com leite"],
      name: "Mocaccino",
      description: "Café expresso com calda de chocolate, pouco leite e espuma",
      price: 9.9,
      availableAmount: 10,
      image: mocaccino,
    },
    {
      id: 10,
      badges: ["especial", "com leite"],
      name: "Chocolate Quente",
      description:
        "Bebida feita com chocolate dissolvido no leite quente e café",
      price: 9.9,
      availableAmount: 10,
      image: chocolate_quente,
    },
    {
      id: 11,
      badges: ["especial", "alcoólico", "gelado"],
      name: "Cubano",
      description:
        "Drink gelado de café expresso com rum, creme de leite e hortelã",
      price: 9.9,
      availableAmount: 10,
      image: cubano,
    },
    {
      id: 12,
      badges: ["especial"],
      name: "Havaiano",
      description: "Bebida adocicada preparada com café e leite de coco",
      price: 9.9,
      availableAmount: 10,
      image: havaiano,
    },
    {
      id: 13,
      badges: ["especial"],
      name: "Árabe",
      description: "Bebida adocicada preparada com café e leite de coco",
      price: 9.9,
      availableAmount: 10,
      image: arabe,
    },
    {
      id: 14,
      badges: ["especial", "alcoólico"],
      name: "Irlandês",
      description: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
      price: 9.9,
      availableAmount: 10,
      image: irlandes,
    },
  ],
};
