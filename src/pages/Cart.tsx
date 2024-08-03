import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Modal } from "@mui/material";
import LoginModal from "../components/LoginModal";
import { Link } from "react-router-dom";

const Cart: FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const {
    products,
    cart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  } = useCart();

  const { isAuthenticated, loading } = useAuth();

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <section className="p-4 pt-40 lg:pt-36 w-full xl:max-w-7xl xl:mx-auto">
      {getTotalCartItems() === 0 ? (
        <div className="flex items-center justify-center mt-20">
          <h2 className="text-gray text-2xl lg:text-3xl">Cart is empty.</h2>
        </div>
      ) : (
        <div className="md:px-4 lg:px-16">
          <h3 className="pb-2 text-2xl font-bold text-primaryColor">
            Cart ({getTotalCartItems()})
          </h3>
          <hr className="h-[3px] bg-gray border-0" />
          {products.map((product) => {
            if (cart[product._id] > 0) {
              return (
                <div key={product._id}>
                  <div className="cart-item text-sm md:text-base font-normal">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-10 md:h-16"
                    />
                    <p>{product.title}</p>
                    <p>Ksh. {product.price}</p>
                    <button className="border-2 border-gray bg-white">
                      {cart[product._id]}
                    </button>
                    <p>
                      Ksh.
                      {(product.price * cart[product._id]).toFixed(2)}
                    </p>
                    <div className="flex items-center justify-center cursor-pointer">
                      <IoClose
                        size={22}
                        onClick={() => removeFromCart(product._id)}
                      />
                    </div>
                  </div>

                  <hr />
                </div>
              );
            }

            return null;
          })}
          <div className="flex flex-col-reverse md:flex-row my-10 gap-5">
            <div className="w-full md:w-1/2 flex flex-col md:mr-20 gap-3 md:gap-5">
              <h1 className="text-2xl font-semibold">Cart Total</h1>

              <div className="text-sm md:text-base">
                <div className="flex justify-between py-3">
                  <p>Subtotal</p>
                  <p>Ksh. {getTotalCartAmount().toFixed(2)}</p>
                </div>

                <hr />

                <div className="flex justify-between py-3">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>

                <hr />

                <div className="text-lg flex justify-between py-3 font-semibold">
                  <h3>Total</h3>
                  <h3>Ksh. {getTotalCartAmount().toFixed(2)}</h3>
                </div>
              </div>

              {isAuthenticated ? (
                <Link
                  to={"/checkout"}
                  className="py-2 md:py-4 outline-none border-none bg-primaryColor text-white text-center text-base font-semibold cursor-pointer"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <button
                  disabled={loading}
                  className="py-2 md:py-4 outline-none border-none bg-primaryColor text-white text-base font-semibold cursor-pointer"
                  onClick={handleOpenLoginModal}
                >
                  Login
                </button>
              )}

              <Modal
                open={isLoginModalOpen}
                onClose={handleCloseLoginModal}
                aria-labelledby="Login modal"
              >
                <LoginModal />
              </Modal>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
