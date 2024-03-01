import "@mantine/core/styles.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  ActionFunction,
  LoaderFunction,
} from "react-router-dom";
import Header from "@/common/components/Header/Header";
import AuthenticatedRoute from "@/common/components/Auth/AuthenticatedRoute";
import { NothingFoundBackground } from "@/common/components/NothingFoundBackground/NothingFoundBackground";

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
  const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true });
  const authenticatedPages = new Set(["posts/create"]);
  const routes: IRoute[] = [];

  for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
    if (!fileName) {
      continue;
    }

    if (fileName.split("/").some((part) => part.startsWith("_"))) {
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

  routes.push({
    path: "*",
    Element: NothingFoundBackground,
    isAuthenticated: false,
  });

  return (
    <BrowserRouter>
      <Header links={[{ link: "/test", label: "Menu Item" }]} />
      <Routes>
        {routes.map(({ path, Element, ErrorBoundary, isAuthenticated }) => (
          <Route
            key={path}
            path={path}
            element={wrapElement(Element, !!isAuthenticated)()}
            {...(ErrorBoundary && { errorElement: <ErrorBoundary /> })}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
