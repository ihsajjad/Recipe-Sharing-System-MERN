import { countries, recipeCategories } from "../config/recipes.config";

const AddRecipes = () => {
  return (
    <div className="max-container">
      <h1 className="text-3xl font-bold text-center my-6 text-[var(--primary-color)] border-b-2 border-dashed border-[var(--primary-color)] pb-3">
        Add Recipes
      </h1>
      <div>
        <form className="">
          <div className="grid grid-cols-4 gap-5">
            <label className="col-span-2">
              Recipe Name:
              <input
                type="text"
                placeholder="Recipe Name"
                className="input input-bordered w-full"
              />
            </label>
            <label className="col-span-2 ">
              Recipe Image:
              <input type="file" className="input input-bordered p-2 w-full" />
            </label>
            <label className="col-span-2">
              Recipe Details:
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Recipe Details..."
              ></textarea>
            </label>
            <label className="col-span-2">
              Embedded Youtube Video:
              <textarea
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Embedded youtube video code"
              ></textarea>
            </label>
            <label className="col-span-2">
              <select
                //   {...register("country", { required: true })}
                className="select select-bordered w-full"
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
            </label>
            <label className="col-span-2">
              <select
                //   {...register("country", { required: true })}
                className="select select-bordered w-full"
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
            </label>
          </div>
          <div className="flex items-center justify-center">
            <input
              type="submit"
              className="cursor-pointer text-white px-3 py-1 font-bold text-lg rounded-full bg-[var(--primary-color)] duration-300 opacity-90 hover:opacity-100 mx-auto w-[180px] my-5"
              value="Add Recipe"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipes;
