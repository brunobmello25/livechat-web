import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { darkTheme } from "../constants/theme";
import { SocketProvider } from "../hooks/socket";

import "../css/reset.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocketProvider>
        <ThemeProvider theme={darkTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SocketProvider>
    </>
  );
}

export default MyApp;
