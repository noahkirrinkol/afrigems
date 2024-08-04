/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types/product";

interface CartContextType {
  products: Product[];
  cart: { [productId: string]: number };
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  getTotalCartAmount: () => number;
  getTotalCartItems: () => number;
  clearCart: () => void;
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

  const addToCart = (productId: string, quantity: number = 1) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + quantity,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find((p) => p._id === productId);
      return product ? total + product.price * quantity : total;
    }, 0);
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const clearCart = () => {
    setCart({});
  };

  const contextValue = {
    products,
    cart,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    clearCart,
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
