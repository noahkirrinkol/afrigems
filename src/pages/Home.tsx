import Products from "../components/Products";

import { useCart } from "../context/CartContext";

const Home = () => {
  const { products } = useCart();

  return (
    <div className="pt-40 xl:max-w-7xl xl:mx-auto">
      <Products products={products || []} />
    </div>
  );
};

export default Home;
