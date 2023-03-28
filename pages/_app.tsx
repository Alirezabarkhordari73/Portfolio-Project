import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "../Context/ContextProvider";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else
    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    );
}
