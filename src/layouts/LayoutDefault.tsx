import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../components/NavBar";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Navbar />
      <Outlet />
    </LayoutContainer>
  );
}

export const LayoutContainer = styled.div`
  background: ${({ theme }) => theme?.["gray-background"]};
  min-height: 100vh;
`;
