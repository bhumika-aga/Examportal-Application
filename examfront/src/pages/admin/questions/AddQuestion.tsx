import { ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAddQuestion } from "../../../hooks/useQuestion";
import type { Question } from "../../../types";

export default function AddQuestion() {
  const { qId, title } = useParams();
  const navigate = useNavigate();
  const addQuestionMutation = useAddQuestion();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Question>();

  // Watch options to populate answer dropdown
  const option1 = watch("option1");
  const option2 = watch("option2");
  const option3 = watch("option3");
  const option4 = watch("option4");

  const onSubmit = (data: Question) => {
    // Structure data as expected
    const questionData = {
      ...data,
      quiz: {
        qId: Number(qId),
      },
    };

    // cast to Question type structure if needed, or simple object
    addQuestionMutation.mutate(questionData as Question & { quiz: { qId: number } }, {
      onSuccess: () => {
        navigate(`/admin/view-questions/${qId}/${title}`);
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to={`/admin/view-questions/${qId}/${title}`}
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Questions
      </Link>

      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Add Question to <span className="text-indigo-600">{title}</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Question Content
            </label>
            <textarea
              rows={5}
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter question content here"
              {...register("content", { required: "Content is required" })}
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Option 1
              </label>
              <input
                type="text"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                {...register("option1", { required: "Option 1 is required" })}
              />
              {errors.option1 && (
                <p className="text-red-500 text-xs mt-1">{errors.option1.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Option 2
              </label>
              <input
                type="text"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                {...register("option2", { required: "Option 2 is required" })}
              />
              {errors.option2 && (
                <p className="text-red-500 text-xs mt-1">{errors.option2.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Option 3
              </label>
              <input
                type="text"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                {...register("option3")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Option 4
              </label>
              <input
                type="text"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                {...register("option4")}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Answer
            </label>
            <select
              className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-zinc-700 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              {...register("answer", { required: "Answer is required" })}
            >
              <option value="">--Select Answer--</option>
              {option1 && <option value={option1}>{option1}</option>}
              {option2 && <option value={option2}>{option2}</option>}
              {option3 && <option value={option3}>{option3}</option>}
              {option4 && <option value={option4}>{option4}</option>}
            </select>
            {errors.answer && <p className="text-red-500 text-xs mt-1">{errors.answer.message}</p>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={addQuestionMutation.isPending}
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-70"
            >
              {addQuestionMutation.isPending && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
