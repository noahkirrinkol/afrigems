import { FC } from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

interface CategoriesProps {
  category: string;
}

const Category: FC<CategoriesProps> = ({ category }) => {
  const { products } = useCart();

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="pt-40 lg:pt-36 py-4 px-2 w-full xl:max-w-7xl xl:mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
        {products.map((product) => {
          if (category === product.category) {
            return (
              <ProductCard
                key={product._id}
                _id={product._id}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            );
          }
        })}
      </div>
    </section>
  );
};

export default Category;
