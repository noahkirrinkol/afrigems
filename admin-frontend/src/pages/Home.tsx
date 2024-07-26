import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center my-40 gap-2">
      <h1 className="text-3xl">Welcome to AfriGems Admin</h1>

      <div className="flex gap-4">
        <Link
          to={"/register"}
          className="font-medium px-8 py-2 rounded-lg bg-primaryColor text-white"
        >
          Register
        </Link>

        <Link
          to={"/login"}
          className="font-medium px-8 py-2 rounded-lg bg-primaryColor text-white"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
