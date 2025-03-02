import { Suspense, JSX } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import TopBar from "./components/TopBar";
import Cart from "./components/Cart";
import { SkeletonComp } from "./components/Skeleton";

function App(): JSX.Element {
  return (
    <div className="min-h-full">
      <TopBar />
      <Cart />
      <Suspense fallback={<SkeletonComp />}>{useRoutes(routes)}</Suspense>
    </div>
  );
}

export default App;
