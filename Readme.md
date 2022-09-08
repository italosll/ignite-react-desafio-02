# Tipagem de tema typescript

-> Importante
-> Não importar tipagem padrão DefaultTheme do typescript no arquivo que exporta o tema.
->Não tipar o tema;
-> no arquivo \*.d.ts utilizar a notação typeof constanteDoTema
-> importar "styled-components"
-> ex:

declare module "styled-components" {
export interface DefaultTheme extends ThemeType {}
}

# React router Outlet / Template

#Tipagem de cores aceitaveis do tema no DeliverySuccessInformation

# Reducer

# sincronização do reducer com o local storage
