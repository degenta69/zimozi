import { Suspense, JSX } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import TopBar from "./components/TopBar";
import Cart from "./components/Cart";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import OrdersPage from "./pages/orders";
// import AdminPanel from "./pages";
// import SeedProducts from "./pages/products/seed";

function App(): JSX.Element {
  return (
    <div className="min-h-full">
      <TopBar />
      <Cart />
      <Suspense fallback={<p>Loading...</p>}>
        {useRoutes([
          ...routes, // Existing routes
          // {
          //   path: "/", // Root path
          //   children: [
          //     {
          //       path: "admin",
          //       element: <ProtectedRoute />, // Protect everything inside
          //       children: [
          //         { path: "", element: <AdminPanel /> },
          //         { path: "orders", element: <OrdersPage /> },
          //         { path: "products/seed", element: <SeedProducts /> },
          //       ],
          //     },
          //   ],
          // },
        ])}
      </Suspense>
    </div>
  );
}

export default App;
