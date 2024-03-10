import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "@/common/i18n";
import "./index.css";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import App from "@/App";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
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
} else {
  console.error("Failed to find the root element");
}
