import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAddCategory } from "../../../hooks/useCategory";
import type { Category } from "../../../types";

export default function AddCategory() {
  const navigate = useNavigate();
  const addCategoryMutation = useAddCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>();

  const onSubmit = (data: Category) => {
    addCategoryMutation.mutate(data, {
      onSuccess: () => {
        navigate("/admin/categories");
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/admin/categories"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Categories
      </Link>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Category</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter category title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter category description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={addCategoryMutation.isPending}
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-70"
            >
              {addCategoryMutation.isPending && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
