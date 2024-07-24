import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, forwardRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterModal = forwardRef(() => {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useAuth();

  const navigate = useNavigate();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setDetails((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await register(details.username, details.email, details.password);
    navigate("/");
  }

  return (
    <div className="bg-white absolute w-[90%] md:w-1/2 h-[360px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
      <div className="p-8 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full md:w-[500px]"
        >
          <h2 className="font-bold text-3xl text-primaryColor text-center">
            Sign Up
          </h2>
          <input
            type="text"
            placeholder="Username"
            required
            autoComplete="off"
            name="username"
            value={details.username}
            onChange={handleChange}
            className="border border-gray p-2 focus:outline-primaryColor rounded-md"
          />

          <input
            type="text"
            placeholder="Email"
            required
            autoComplete="off"
            name="email"
            value={details.email}
            onChange={handleChange}
            className="border border-gray p-2 focus:outline-primaryColor rounded-md"
          />

          <div className="flex items-center gap-1 pr-2 border border-gray focus:outline-primaryColor rounded-md">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              autoComplete="off"
              name="password"
              value={details.password}
              onChange={handleChange}
              className="w-full p-2  focus:outline-primaryColor rounded-md"
            />
            {showPassword ? (
              <FiEye
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-primaryColor cursor-pointer"
              />
            ) : (
              <FiEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-primaryColor cursor-pointer"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-primaryColor text-white font-semibold text-lg rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
});

export default RegisterModal;
