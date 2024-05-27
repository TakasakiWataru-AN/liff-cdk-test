import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import liff from "@line/liff";
import App from "./App";

const liffCreate = async () => {
  if (import.meta.env.VITE_ENV !== "prod") {
    const { default: VConsole } = await import("vconsole");
    new VConsole();
  }

  const container = document.getElementById("root");
  await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
  await liff.ready;

  if (!liff.isLoggedIn()) {
    liff.login();
    createRoot(container!).render(
      <React.StrictMode>
        <></>
      </React.StrictMode>
    );
  } else {
    createRoot(container!).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
    );
  }
}

liffCreate();
