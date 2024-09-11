// src/pages/_app.tsx
import React, { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";

import { AuthenticationProvider } from "@/layout/authProvider";
import createEmotionCache from "@/utils/createEmotionCache";
import theme from "@/styles/theme";
import { store } from "@/store";
import "../src/styles/globals.scss";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps,
	} = props;

	useEffect(() => {
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles && jssStyles.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<React.Fragment>
			<Head>
				<title>Administrator</title>
			</Head>
			<CacheProvider value={emotionCache}>
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						{/* <SocketContextProvider> */}
						<AuthenticationProvider>
							<ToastContainer />
							<CssBaseline />
							<Component {...pageProps} />
						</AuthenticationProvider>
						{/* </SocketContextProvider> */}
					</ThemeProvider>
				</Provider>
			</CacheProvider>
		</React.Fragment>
	);
}
