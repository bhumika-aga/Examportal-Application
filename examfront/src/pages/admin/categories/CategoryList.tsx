import { Loader2, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCategories, useDeleteCategory } from "../../../hooks/useCategory";

interface CategoryListProps {
  readOnly?: boolean;
}

export default function CategoryList({ readOnly = false }: CategoryListProps) {
  const { data: categories, isLoading } = useCategories();
  const deleteCategoryMutation = useDeleteCategory();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {readOnly ? "Select a category to view quizzes" : "Manage quiz categories"}
          </p>
        </div>
        {!readOnly && (
          <Link
            to="/admin/add-category"
            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add Category
          </Link>
        )}
      </div>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-zinc-700">
          {categories?.map((category) => (
            <li
              key={category.cId}
              className="p-6 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    <Link
                      to={
                        readOnly
                          ? `/user-dashboard/${category.cId}`
                          : `/admin/quizzes/category/${category.cId}`
                      }
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {category.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">{category.description}</p>
                </div>
                {!readOnly && (
                  <button
                    onClick={() => handleDelete(category.cId)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </li>
          ))}
          {categories?.length === 0 && (
            <li className="p-8 text-center text-gray-500 dark:text-gray-400">
              No categories found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
