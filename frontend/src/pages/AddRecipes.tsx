import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { RecipeDataType } from "../../../backend/src/shared/types";
import * as apiClient from "../api-client";
import { countries, recipeCategories } from "../config/recipes.config";

const AddRecipes = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<RecipeDataType>();

  // uploading the image to the imgBB
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) {
      const data = new FormData();
      data.append("image", files[0]);

      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=299f98495334969de108ff70df2ea284",
        {
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      if (result.data.url) setValue("recipeImage", result.data.url);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!data.recipeImage) {
      return setError("recipeImage", { message: "This field is required" });
    }

    const token = localStorage.getItem("token");
    if (token) {
      const result = await apiClient.createNewRecipe(data, token);
      console.log(result);
    }
  });

  return (
    <div className="max-container">
      <h1 className="text-3xl font-bold text-center my-6 text-[var(--primary-color)] border-b-2 border-dashed border-[var(--primary-color)] pb-3">
        Add Recipes
      </h1>
      <div>
        <form onSubmit={onSubmit} className="">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-5">
            <label className=" sm:col-span-2">
              Recipe Name:
              <input
                type="text"
                {...register("recipeName", { required: true })}
                placeholder="Recipe Name"
                className="input input-bordered w-full"
              />
              {errors?.recipeName && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
            <label className=" sm:col-span-2 ">
              Recipe Image:
              <input
                type="file"
                onChange={handleUploadImage}
                className="input input-bordered p-2 w-full"
              />
              {errors?.recipeImage && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
            <label className=" sm:col-span-2">
              Recipe Details:
              <textarea
                {...register("recipeDetails", { required: true })}
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Recipe Details..."
              ></textarea>
              {errors?.recipeDetails && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
            <label className=" sm:col-span-2">
              Embedded Youtube Video:
              <textarea
                {...register("youtubeVideo", { required: true })}
                className="textarea textarea-bordered w-full"
                rows={3}
                placeholder="Embedded youtube video code"
              ></textarea>
              {errors?.youtubeVideo && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
            <label className=" sm:col-span-2">
              <select
                {...register("country", { required: true })}
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
              {errors?.country && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
            </label>
            <label className=" sm:col-span-2">
              <select
                {...register("category", { required: true })}
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
              {errors?.category && (
                <span className="text-sm text-red-500">
                  This field is required
                </span>
              )}
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
