import { Dispatch, SetStateAction } from "react";
import { countries, recipeCategories } from "../config/recipes.config";

type SearchProps = {
  setSearchQuery: Dispatch<
    SetStateAction<{ searchText: string; country: string; category: string }>
  >;
};

const SearchQueries = ({ setSearchQuery }: SearchProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 md:gap-8">
      <label className="input input-bordered flex items-center w-full sm:flex-1 mb-4 gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(e) =>
            setSearchQuery((p) => ({ ...p, searchText: e.target.value }))
          }
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>

      <select
        onChange={(e) =>
          setSearchQuery((p) => ({ ...p, country: e.target.value }))
        }
        className="select select-bordered w-full sm:flex-1"
      >
        <option value="" disabled selected>
          Country
        </option>
        {countries.map((country) => (
          <option value={country} key={country}>
            {country}
          </option>
        ))}
      </select>

      <select
        onChange={(e) =>
          setSearchQuery((p) => ({ ...p, category: e.target.value }))
        }
        className="select select-bordered w-full sm:flex-1"
      >
        <option value="" disabled selected>
          Category
        </option>
        {recipeCategories.map((recipe) => (
          <option value={recipe} key={recipe}>
            {recipe}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchQueries;
