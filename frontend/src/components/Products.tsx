import { FC } from "react";

import { Product } from "../types/product";
import CategorySection from "./CategorySection";

interface ProductsProps {
  products: Product[];
}

const Products: FC<ProductsProps> = ({ products }) => {
  const necklaces = products.filter(
    (product) => product.category === "necklace"
  );

  const earrings = products.filter(
    (product) => product.category === "earrings"
  );

  const bracelets = products.filter(
    (product) => product.category === "bracelet"
  );

  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-6 px-2 w-full xl:max-w-7xl xl:mx-auto flex flex-col gap-4">
      <CategorySection
        name="Necklaces"
        category="necklace"
        products={necklaces}
      />
      <CategorySection
        name="Earrings"
        category="earrings"
        products={earrings}
      />
      <CategorySection
        name="Bracelets"
        category="bracelet"
        products={bracelets}
      />
    </section>
  );
};

export default Products;
