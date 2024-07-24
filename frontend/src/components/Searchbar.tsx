import { MdSearch } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

const categories = ["necklace", "earrings", "bracelet"];

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };
  return (
    <div className="md:px-6 w-full py-2 px-4 flex flex-col-reverse lg:flex-row items-center gap-2 md:gap-4 lg:gap-16 md:justify-between">
      {/* CATEGORIES LIST */}
      <ul className="w-full md:w-3/4 lg:w-1/2 flex items-center gap-20 flex-wrap font-medium">
        {categories.map((category, index) => {
          return (
            <li key={index} className="">
              <NavLink
                to={"/" + category}
                className={({ isActive }) =>
                  `font-bold capitalize text-xs md:text-base ${
                    isActive
                      ? "border-b-4 border-primaryColor duration-100"
                      : ""
                  }`
                }
              >
                {category}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* SEARCH BAR */}
      <div className="flex w-full lg:w-1/2 items-center gap-2 border border-[#808080] p-1 rounded-xl">
        <MdSearch size={22} className="text-[#808080]" />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for products"
            className="w-full focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default Searchbar;
