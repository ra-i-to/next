import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/reset.css";
import Head from "next/head";
import Header from "../components/Header";
import ProtectRouteProvider from "../providers/ProtectRouteProvider";
import GlobalStateProvider from "../providers/GlobalStateProvider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <UserProvider>
        <GlobalStateProvider>
          <ProtectRouteProvider>
            <Header />
            <Component {...pageProps} />
          </ProtectRouteProvider>
        </GlobalStateProvider>
      </UserProvider>
    </>
  );
};

export default App;
