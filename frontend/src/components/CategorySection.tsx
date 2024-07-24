import { FC } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type CategorySectionProps = {
  name: string;
  category: string;
  products: Product[];
};

const CategorySection: FC<CategorySectionProps> = ({
  name,
  category,
  products,
}) => {
  return (
    <div className="border border-gray p-3 space-y-2">
      <div className="flex items-center justify-between px-2 md:px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{name}</h2>

        <Link to={`/${category}`}>
          <button
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center justify-center gap-2 text-primaryColor font-semibold"
          >
            <span className="text-lg">See All</span>
            <FaChevronRight size={20} />
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8">
        {products.slice(0, 4).map((product: Product) => {
          return (
            <ProductCard
              key={product._id}
              _id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
