# COFFE DELIVERY

Aplicação permite gerenciar um carrinho, adicionar produtos remover e alterar a quantidade de cada um deles individualmente.
Durante o desenvolvimento dessa aplicação foi destacada a importância da utilização do hook `useReducer` do react para gerenciamento de
estados complexos com multiplas propriedades.

Utilizando o `useReducer` é mais simples alterar várias propriedades do estado de acordo com cada ação. Um potencializador
dessa estratégia é a sincronização do estado com o amazenamento da seção (sessionStorage) mantendo os dados do estado mesmo ao atualizar a página.

Ainda foram implementados conceitos de outlet/Template da biblioteca react-router-dom e a `tipagem dinâmica do tema do styled components` cujo processo é descrito ao fim deste readme.

Documentação: https://beta.reactjs.org/apis/react/useReducer#usereducer

## Screenshots

![Coffe-Delivery](https://user-images.githubusercontent.com/40503929/189117831-60ea6020-d5a6-496e-a892-df76d78caf78.png)

## Stack utilizada

**Front-end:** React (Vite), Styled Components.

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/italosll/ignite-react-desafio-02
```

Entre no diretório do projeto

```bash
  cd ignite-react-desafio-02
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```

# Tipagem dinâmica de tema Styled com typescript

-> Importante  
-> Não importar tipagem padrão DefaultTheme do typescript no arquivo que exporta o tema.  
-> Não tipar o tema  
-> No arquivo \*.d.ts utilizar a notação typeof constanteDoTema  
-> importar "styled-components"

Exemplo:

declare module "styled-components" {
export interface DefaultTheme extends ThemeType {}
}
