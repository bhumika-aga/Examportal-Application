import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCategories } from "../../../hooks/useCategory";
import { useQuiz, useUpdateQuiz } from "../../../hooks/useQuiz";
import type { Quiz } from "../../../types";

export default function UpdateQuiz() {
  const { qId } = useParams();
  const navigate = useNavigate();
  const updateQuizMutation = useUpdateQuiz();
  const { data: quiz, isLoading: isQuizLoading } = useQuiz(Number(qId));
  const { data: categories } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Quiz>();

  useEffect(() => {
    if (quiz) {
      reset(quiz);
    }
  }, [quiz, reset]);

  const onSubmit = (data: Quiz) => {
    // Ensure category object structure is maintained or ID is sent correctly
    // The backend expects the whole object or at least ID nested.
    // React Hook Form might flatten it if not careful.
    // Actually, we registered 'category.cId', so data.category.cId should be set.
    // But we need to make sure we pass the full object if backend requires it.
    // For update, usually we send what we have.

    // Check if category is object or just ID.
    // If we use dot notation in register, it constructs the object.

    updateQuizMutation.mutate(data, {
      onSuccess: () => {
        navigate("/admin/quizzes");
      },
    });
  };

  if (isQuizLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/admin/quizzes"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Quizzes
      </Link>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Update Quiz</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Enter quiz title"
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
                placeholder="Enter quiz description"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Max Marks
                </label>
                <input
                  type="number"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Ex: 100"
                  {...register("maxMarks", {
                    required: "Max Marks is required",
                  })}
                />
                {errors.maxMarks && (
                  <p className="text-red-500 text-xs mt-1">{errors.maxMarks.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Questions
                </label>
                <input
                  type="number"
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="Ex: 10"
                  {...register("noOfQuestions", {
                    required: "Number of Questions is required",
                  })}
                />
                {errors.noOfQuestions && (
                  <p className="text-red-500 text-xs mt-1">{errors.noOfQuestions.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                {...register("category.cId", {
                  required: "Category is required",
                })}
                defaultValue={quiz?.category?.cId} // fallback
              >
                <option value="">Select Category</option>
                {categories?.map((c) => (
                  <option key={c.cId} value={c.cId}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                id="active"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                {...register("active")}
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-900 dark:text-white">
                Publish Quiz?
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updateQuizMutation.isPending}
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-70"
            >
              {updateQuizMutation.isPending && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
              Update Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
