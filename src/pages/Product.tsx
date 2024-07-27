import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import { Product } from "../types/product";

import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const query = useParams();
  const productId = query.productId ?? "";

  const { products } = useCart();

  const [product, setProduct] = useState<Product>({
    _id: productId,
    title: "",
    description: "",
    category: "",
    price: 0,
    image: "",
  });

  const { addToCart } = useCart();

  // Getting product clicked using its id
  useEffect(() => {
    const actualProduct = products.find((product) => product._id === productId);

    if (actualProduct) {
      setProduct(actualProduct);
    }
  }, [productId, products]);

  // Handling AddToCart functionality using addToCart function from CartContext
  const handleAddToCart = () => {
    addToCart(product._id);

    toast.success("Product added successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (!product.image) {
    return (
      <div className="pt-40 lg:pt-36 py-4 px-2 w-full text-center xl:max-w-7xl xl:mx-auto">
        Loading...
      </div>
    );
  }

  return (
    <>
      <section className="pt-40 lg:pt-36 py-4 px-2 w-full xl:max-w-7xl xl:mx-auto">
        <div className="px-2 md:w-3/4 md:mx-auto flex flex-col md:flex-row items-center">
          {/* IMAGE & ADD TO CART BUTTON */}
          <div className="w-full md:w-1/2 h-full">
            <img
              src={product.image}
              alt={product.title}
              className="w-[80%] h-[300px] md:h-[350px] lg:h-[500px] mx-auto md:mx-0 hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>

          {/* PRODUCT TITLE, DESCRIPTION & PRICE */}
          <div className="relative w-full md:w-1/2 flex flex-col gap-2 md:gap-4">
            <h2 className="font-semibold text-2xl">{product.title}</h2>

            <div className="space-y-2">
              <p className="text-sm lg:text-lg">{product.description}</p>

              <div className="flex items-center gap-4 lg:gap-8 font-light text-sm">
                <p className="capitalize">{product.category}</p>
              </div>
            </div>

            <p className="font-bold text-xl">Ksh. {product.price}</p>

            <button
              onClick={handleAddToCart}
              className="uppercase py-2 bg-primaryColor text-white text-lg font-medium"
            >
              Add to cart
            </button>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ProductPage;
