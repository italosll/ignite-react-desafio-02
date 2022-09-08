import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/LayoutDefault";
import { PageCheckout } from "./pages/Checkout/PageCheckout";
import { PageHome } from "./pages/Home/PageHome";
import { PageSuccess } from "./pages/Success/PageSuccess";

export const URL_HOME = "/";
export const URL_CHECKOUT = "/checkout";
export const URL_SUCCESS = "/success";

export function Router() {
  return (
    <Routes>
      <Route path={URL_HOME} element={<DefaultLayout />}>
        <Route path={URL_HOME} element={<PageHome />} />
        <Route path={URL_CHECKOUT} element={<PageCheckout />} />
        <Route path={URL_SUCCESS} element={<PageSuccess />} />
      </Route>
    </Routes>
  );
}
