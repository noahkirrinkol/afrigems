import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { ImSpinner2 } from "react-icons/im";

const Checkout: React.FC = () => {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const { getTotalCartAmount, clearCart } = useCart();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsPaymentSuccessful(true);
      clearCart();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!isPaymentSuccessful ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2">
              Amount To Be Payed
            </label>
            <input
              disabled
              value={getTotalCartAmount()}
              onChange={handleChange}
              className="w-full p-2 border border-gray last:rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-2">
              Enter You M-Pesa Number
            </label>
            <input
              type="tel"
              value={number}
              onChange={handleChange}
              placeholder="07..."
              className="w-full p-2 border border-gray rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-primaryColor text-white font-semibold text-lg rounded-md flex items-center justify-center"
          >
            {loading ? (
              <ImSpinner2 className="animate-spin" size={25} />
            ) : (
              "Make Payment"
            )}
          </button>
        </form>
      ) : (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p>Thank you for shopping with Afrigems.</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
