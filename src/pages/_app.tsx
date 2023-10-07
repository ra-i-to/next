import React, { useState } from 'react';
import {UserProvider} from "@auth0/nextjs-auth0/client";
import {AppProps} from "next/app";
import "../styles/globals.css";
import "../styles/reset.css";
import Head from "next/head";
import Header from "../components/Header";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProtectRouteProvider from "../providers/ProtectRouteProvider";
import GlobalStateProvider from "../providers/GlobalStateProvider";
import { ThemeStatus, ThemeStatusContext } from "@/src/contexts/ThemeStatusContext";



const App = ({Component, pageProps}: AppProps) => {
    const [themeStatus, setThemeStatus] = useState<ThemeStatus>('light');
    const Theme = createTheme({
        palette: {
            mode: themeStatus,
        },
    });
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <UserProvider>
                <ThemeStatusContext.Provider value = {{themeStatus, setThemeStatus}}>
                <ThemeProvider theme={Theme}>
                    <CssBaseline/>
                    <GlobalStateProvider>
                        <ProtectRouteProvider>
                            <Header/>
                            <Component {...pageProps} />
                        </ProtectRouteProvider>
                    </GlobalStateProvider>
                </ThemeProvider>
                </ThemeStatusContext.Provider>
            </UserProvider>
        </>
    );
};

export default App;
