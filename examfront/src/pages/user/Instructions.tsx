import { AlertTriangle, Loader2, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuiz } from "../../hooks/useQuiz";

export default function Instructions() {
  const { qId } = useParams();
  const navigate = useNavigate();
  const { data: quiz, isLoading } = useQuiz(Number(qId));

  const startQuiz = () => {
    Swal.fire({
      title: "Do you want to start the quiz?",
      showCancelButton: true,
      confirmButtonText: "Start",
      icon: "info",
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        navigate(`/user-dashboard/start/${qId}`);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Read Instructions for <span className="text-indigo-600">{quiz?.title}</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{quiz?.description}</p>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200">
                Important Instructions
              </h3>
              <div className="mt-4 text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    This quiz consists of <b>{quiz?.noOfQuestions}</b> questions.
                  </li>
                  <li>
                    Each question carries{" "}
                    <b>{Number(quiz?.maxMarks) / Number(quiz?.noOfQuestions)}</b> marks.
                  </li>
                  <li>
                    Total marks for this quiz is <b>{quiz?.maxMarks}</b>.
                  </li>
                  <li>
                    There is a timer for this quiz. Ensure you complete it within the time limit.
                  </li>
                  <li>
                    If you refresh the page, your progress might be lost or the quiz might submit
                    automatically.
                  </li>
                  <li>Do not switch tabs or minimize the window.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={startQuiz}
            className="flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <PlayCircle size={24} className="mr-2" />
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
