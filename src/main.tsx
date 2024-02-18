import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@/common/i18n/i18n";
import "./index.css";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import App from "@/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider>
        <Suspense fallback={<LoadingOverlay visible={true} />}>
          <App />
        </Suspense>
      </MantineProvider>
    </Provider>
  </React.StrictMode>,
);
