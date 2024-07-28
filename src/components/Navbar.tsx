import { Link } from "react-router-dom";

import { MdOutlineShoppingCart } from "react-icons/md";

import Searchbar from "./Searchbar";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const { getTotalCartItems } = useCart();

  const { isAuthenticated, logout, userDetails } = useAuth();

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  function handleLogout() {
    logout();
  }

  return (
    <section className="xl:max-w-7xl xl:mx-auto w-full h-36 md:h-40 lg:h-32 mb-4 bg-white fixed z-10 top-0 left-0 right-0">
      <nav className="flex flex-col gap-2 px-2 py-3 md:px-6 border-b-[3px] border-gray">
        <div className="flex items-center justify-between md:gap-8">
          {/* LOGO */}
          <Link to={"/"}>
            <h1 className="text-3xl">
              <span className="font-medium">Afri</span>
              <span className="font-semibold text-primaryColor">Gems</span>
            </h1>
          </Link>

          {/* CART & LOGIN BUTTON */}
          <ul className="flex items-center gap-2 md:gap-4">
            <li className="relative">
              <Link to={"/cart"}>
                <MdOutlineShoppingCart size={30} />
                <div className="w-[20px] h-[20px] absolute top-[-5px] left-4 text-sm rounded-full bg-primaryColor font-semibold border border-white">
                  <small className="flex justify-center items-center text-sm text-center text-white">
                    {getTotalCartItems()}
                  </small>
                </div>
              </Link>
            </li>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {userDetails && (
                  <h2 className="text-normal">Hello, {userDetails.username}</h2>
                )}
                <button
                  onClick={handleLogout}
                  className="font-medium py-2 px-4 rounded-lg bg-primaryColor text-white"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex gap-2 md:gap-4">
                <button
                  onClick={handleOpenLoginModal}
                  className="font-medium p-2 rounded-lg hover:text-primaryColor"
                >
                  Login
                </button>

                <button
                  onClick={handleOpenRegisterModal}
                  className="font-medium py-2 px-4 rounded-lg bg-primaryColor text-white"
                >
                  Register
                </button>
              </div>
            )}
          </ul>

          <Modal
            open={isLoginModalOpen}
            onClose={handleCloseLoginModal}
            aria-labelledby="Login modal"
          >
            <LoginModal />
          </Modal>

          <Modal
            open={isRegisterModalOpen}
            onClose={handleCloseRegisterModal}
            aria-labelledby="Login modal"
          >
            <RegisterModal />
          </Modal>
        </div>
      </nav>

      <Searchbar />
    </section>
  );
};

export default Navbar;
