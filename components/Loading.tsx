import { ReactElement } from "react";
import styled from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

import { darkTheme } from "../constants/theme";

export function Loading(): ReactElement {
  return (
    <Container>
      <ClipLoader size={50} color={darkTheme.colors.primary} loading={true} />
    </Container>
  );
}

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
