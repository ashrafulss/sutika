import { Routes, Route } from "react-router";
import MainLayout from "./layouts/Main-layout";
import Home from "./components/Home";
import Shop from "./components/Shop";
import WhySutika from "./components/WhySutika";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="why-sutika" element={<WhySutika />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
