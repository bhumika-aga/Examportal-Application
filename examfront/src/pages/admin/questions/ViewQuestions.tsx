import { useParams, Link } from "react-router-dom";
import { useQuestions, useDeleteQuestion } from "../../../hooks/useQuestion";
import { useQuiz } from "../../../hooks/useQuiz";
import { Loader2, Plus, Trash2, ArrowLeft } from "lucide-react";
import { cn } from "../../../utils";

export default function ViewQuestions() {
  const { qId, title } = useParams();
  const { data: questions, isLoading } = useQuestions(Number(qId));
  const { data: quiz } = useQuiz(Number(qId));
  const deleteQuestionMutation = useDeleteQuestion();

  // Use title from URL or fallback to quiz data
  const quizTitle = title || quiz?.title;

  const handleDelete = (quesId: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      deleteQuestionMutation.mutate(quesId);
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
      <Link
        to="/admin/quizzes"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Quizzes
      </Link>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Questions for <span className="text-indigo-600">{quizTitle}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage questions for this quiz</p>
        </div>
        <Link
          to={`/admin/add-question/${qId}/${quizTitle}`}
          className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Question
        </Link>
      </div>

      <div className="space-y-4">
        {questions?.map((q, index) => (
          <div
            key={q.quesId}
            className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 p-6"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  <span className="text-gray-500 mr-2">Q{index + 1}.</span>
                  <span dangerouslySetInnerHTML={{ __html: q.content }} />
                </h3>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "p-2 rounded border",
                      q.answer === q.option1
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "border-gray-100 dark:border-zinc-700"
                    )}
                  >
                    <span className="font-semibold mr-2">A.</span> {q.option1}
                  </div>
                  <div
                    className={cn(
                      "p-2 rounded border",
                      q.answer === q.option2
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "border-gray-100 dark:border-zinc-700"
                    )}
                  >
                    <span className="font-semibold mr-2">B.</span> {q.option2}
                  </div>
                  <div
                    className={cn(
                      "p-2 rounded border",
                      q.answer === q.option3
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "border-gray-100 dark:border-zinc-700"
                    )}
                  >
                    <span className="font-semibold mr-2">C.</span> {q.option3}
                  </div>
                  <div
                    className={cn(
                      "p-2 rounded border",
                      q.answer === q.option4
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                        : "border-gray-100 dark:border-zinc-700"
                    )}
                  >
                    <span className="font-semibold mr-2">D.</span> {q.option4}
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Correct Answer:{" "}
                  </span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">
                    {q.answer}
                  </span>
                </div>
              </div>

              <div className="ml-4 flex flex-col space-y-2">
                <button
                  onClick={() => handleDelete(q.quesId)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  title="Delete Question"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {questions?.length === 0 && (
          <div className="text-center p-12 bg-white dark:bg-zinc-800 rounded-lg border border-dashed border-gray-300 dark:border-zinc-700">
            <p className="text-gray-500 dark:text-gray-400">No questions found for this quiz.</p>
          </div>
        )}
      </div>
    </div>
  );
}
