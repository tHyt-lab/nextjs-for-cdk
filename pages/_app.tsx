// import "@/styles/globals.css";
import { useEffect, useState } from "react";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

import type { AppProps } from "next/app";

import { msalConfig } from "@/lib/auth/msalConfig";

function LoginCheck(): JSX.Element {
  const { accounts } = useMsal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (router.pathname !== "/" && accounts.length === 0) {
      router.push("/").finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [accounts.length, router]);

  return (
    <Backdrop
      open={isLoading}
      sx={{
        color: "#fff",
        backgroundColor: "white",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const pca = new PublicClientApplication(msalConfig);

  return (
    <MsalProvider instance={pca}>
      <LoginCheck />
      <Component {...pageProps} />
    </MsalProvider>
  );
}
