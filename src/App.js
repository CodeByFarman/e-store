import "./App.css";
import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getCategories } from "./fetcher";

import ProductDetail from "./components/productDetail";
import Basket from "./components/basket";
import Checkout from "./components/checkout";
import Category from "./components/Category";
import Home from "./components/home";
import ConfirmOrder from './components/confirmOrder';
import Layout from "./components/layout";
import SearchResults from "./components/searchResults";





function App() {
  const [categories, setCategories] = useState({
      errorMessage: "",
      data: [],
  });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          const responseObject = await getCategories();
          setCategories(responseObject);
          setLoading(false);
      };
      fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (categories.errorMessage) return <div>Error: {categories.errorMessage}</div>;

  return (
      <BrowserRouter>
          <Routes>
              <Route
                  path="/"
                  element={
                      <Layout
                          categories={categories}
                      />
                  }
              >
                  <Route index element={<Home />} />
                  <Route path="basket" element={<Basket />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="confirmorder" element={<ConfirmOrder />} />
                  <Route path="search" element={<SearchResults />} />
                  <Route
                      path="categories/:categoryId"
                      element={<Category />}
                  />
                  <Route
                      path="products/:productId"
                      element={<ProductDetail />}
                  />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}
export default App;