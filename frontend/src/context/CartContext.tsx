/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";

// import { products } from "../data/products";
import axios from "axios";
import { Product } from "../types/product";

interface CartContextType {
  products: Product[];
  cart: { [productId: string]: number };
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  getTotalCartAmount: () => number;
  getTotalCartItems: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);

const BASE_URL = import.meta.env.VITE_BASE_URL;

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [productId: string]: number }>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${BASE_URL}/api/v1/product/all`);

      const data: Product[] = response.data.data;

      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [productId]: prevCart[productId] - 1,
      };
      if (updatedCart[productId] <= 0) {
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    Object.entries(cart).forEach(([productId, quantity]) => {
      const product = products?.find((p) => p._id == productId);
      if (product) {
        totalAmount += product.price * quantity;
      }
    });

    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;

    Object.values(cart).forEach((quantity) => {
      totalItems += quantity;
    });

    return totalItems;
  };

  const contextValue = {
    products,
    cart,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartContextProvider;
