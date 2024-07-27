import { FC } from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const Cart: FC = () => {
  const {
    products,
    cart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  } = useCart();

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

              {/* <button disabled className="py-2 md:py-4 outline-none border-none bg-primaryColor text-white text-base font-semibold cursor-pointer">
                Proceed to Checkout
              </button> */}
            </div>

            {/* <div className="flex-1 text-base font-medium">
              <p className="text-secondaryColor">
                If you have a promo code, Enter it here
              </p>

              <div className="w-full lg:w-[504px] flex justify-between mt-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="border-none outline-none bg-[#eaeaea] text-base w-3/4 py-2 px-3"
                />
                <button className="w-1/4 py-2 cursor-pointer text-base bg-black text-white">
                  Submit
                </button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
