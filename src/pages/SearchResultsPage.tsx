import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

const SearchResultsPage = () => {
  const { searchTerm } = useSearch();
  const { products } = useCart();

  const searchResults = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-40 xl:max-w-7xl xl:mx-auto">
      {searchResults.length === 0 ? (
        <p className="text-center text-2xl text-gray">
          No results for "{searchTerm}" was found.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-8">
          {searchResults.map((result) => {
            return (
              <ProductCard
                key={result._id}
                _id={result._id}
                title={result.title}
                price={result.price}
                image={result.image}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
