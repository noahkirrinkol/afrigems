import { FC } from "react";
import { Link } from "react-router-dom";

import { Product } from "../types/product";

const ProductCard: FC<Product> = ({ _id, title, price, image }) => {
  return (
    <Link to={"/products/" + _id}>
      <div className="bg-white rounded-lg w-full hover:shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out">
        <div className="relative w-full h-36 md:h-48 lg:h-64 flex items-center justify-center overflow-hidden rounded-lg">
          <img src={image} alt={title} className="w-[70%] h-full" />
        </div>

        <div className="p-4">
          <h2 className="text-base font-medium">
            {title.split(" ").slice(0, 4).join(" ")}
          </h2>
          <p className="mt-1 text-sm font-bold">Ksh. {price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
