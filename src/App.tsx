import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "@/store";
import { Layout } from "@/components/common/Layout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Home } from "@/pages/Home";
import { Catalog } from "@/pages/Catalog";
import { ProductDetail } from "@/pages/ProductDetail";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { NotFound } from "@/pages/NotFound";
import { ROUTES } from "@/utils";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const routerFutureConfig = {
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_partialHydration: true,
  v7_relativeSplatPath: true,
  v7_skipActionErrorRevalidation: true,
  v7_startTransition: true,
};


function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Router future={routerFutureConfig}>
            <Layout>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.CATALOG} element={<Catalog />} />
                <Route
                  path={ROUTES.PRODUCT_DETAIL}
                  element={<ProductDetail />}
                />
                <Route path={ROUTES.CART} element={<Cart />} />
                <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
