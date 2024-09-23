import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import global_ua from "./translations/ua/global.json";
import global_en from "./translations/ua/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import App from "./App.jsx";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "ua",
  resources: {
    ua: {
      global: global_ua
    },
    en: {
      global: global_en
    }
  }
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>
);
