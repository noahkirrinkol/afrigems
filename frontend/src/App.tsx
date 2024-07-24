import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Cart from "./pages/Cart";
import Home from "./pages/Home";

import Category from "./pages/Category";
import ProductPage from "./pages/Product";
import Footer from "./components/Footer";
import { useSearch } from "./context/SearchContext";

import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  const { searchTerm } = useSearch();

  return (
    <main className="w-full h-screen bg-white text-black text-base flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/necklace" element={<Category category="necklace" />} />
        <Route path="/earrings" element={<Category category="earrings" />} />
        <Route path="/bracelet" element={<Category category="bracelet" />} />

        <Route path="/products/:productId" element={<ProductPage />} />
        <Route
          path={`/search/:${searchTerm}`}
          element={<SearchResultsPage />}
        />

        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
