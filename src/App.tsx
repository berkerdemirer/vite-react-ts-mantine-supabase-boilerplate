import {
  ActionFunction,
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import React from "react";
import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import Header from "@/components/Header/Header";
import "./i18n/i18n";

interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType;
}

interface IRoute extends RouteCommon {
  path: string;
  Element: React.ComponentType;
  isAuthenticated?: boolean;
}

interface Pages {
  [key: string]: {
    default: React.ComponentType;
  } & RouteCommon;
}

const App = () => {
  const queryClient = new QueryClient();
  const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
  const authenticatedPages = new Set(["secure"]);
  const routes: IRoute[] = [];

  for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
    if (!fileName) {
      continue;
    }

    const normalizedPathName = fileName.includes("$")
      ? fileName.replace("$", ":")
      : fileName.replace(/\/index/, "");

    routes.push({
      path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
      Element: pages[path].default,
      loader: pages[path]?.loader as LoaderFunction | undefined,
      action: pages[path]?.action as ActionFunction | undefined,
      ErrorBoundary: pages[path]?.ErrorBoundary,
      isAuthenticated: authenticatedPages.has(fileName),
    });
  }
  const wrapElement = (
    Element: React.ComponentType,
    isAuthenticated: boolean,
  ) => {
    return isAuthenticated
      ? () => <AuthenticatedRoute element={<Element />} />
      : () => <Element />;
  };

  const router = createBrowserRouter(
    routes.map(({ Element, ErrorBoundary, isAuthenticated, ...rest }) => ({
      ...rest,
      element: wrapElement(Element, !!isAuthenticated)(),
      ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
    })),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        onRedirectCallback={(appState) =>
          (window.location.href = appState?.returnTo || "/")
        }
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Header links={[{ link: "test", label: "asdas" }]} />
          <RouterProvider router={router} />
        </MantineProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
};

export default App;
