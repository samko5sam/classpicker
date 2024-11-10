import { createHashRouter, RouterProvider, LoaderFunction, ActionFunction } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { Toaster } from "@/components/ui/toaster";
// https://dev.to/franciscomendes10866/file-based-routing-using-vite-and-react-router-3fdo

interface PageModule {
  default: React.ComponentType;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType;
}

const pages: Record<string, PageModule> = import.meta.glob("./pages/**/*.tsx", { eager: true });

interface RouteConfig {
  path: string;
  Element: React.ComponentType;
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType;
}

const routes: RouteConfig[] = [];
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
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

const router = createHashRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

function App(): JSX.Element {
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
      <Toaster />
    </GlobalProvider>
  );
}

export default App;
