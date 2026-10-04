import { Routes, Route } from "react-router";
import MainLayout from "./layouts/Main-layout";
import Home from "./components/Home";
import Shop from "./components/Shop";
import WhySutika from "./components/WhySutika";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import ProductDetails from "./components/products/ProductDetails";
import { PRODUCTS, weave } from "./data/products";

export default function App() {
  const handleAddToCart = (id: number, quantity: number = 1) => {
    console.log(`Added product ${id} with quantity ${quantity} to cart`);
  };
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="why-sutika" element={<WhySutika />} />
        <Route path="contact" element={<Contact />} />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={PRODUCTS}
              onAddToCart={handleAddToCart}
              weave={weave}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
