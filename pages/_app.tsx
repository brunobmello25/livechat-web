import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import { darkTheme } from "../constants/theme";
import { SocketProvider } from "../hooks/socket";

import "../css/reset.css";
import { UserProvider } from "../hooks/user";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocketProvider>
        <ThemeProvider theme={darkTheme}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </SocketProvider>
    </>
  );
}

export default MyApp;
