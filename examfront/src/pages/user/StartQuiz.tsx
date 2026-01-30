import { CheckCircle, ChevronLeft, ChevronRight, Loader2, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";
import { useQuestionsForUser } from "../../hooks/useQuestion";
import { useQuiz } from "../../hooks/useQuiz";

export default function StartQuiz() {
  const { qId } = useParams();
  const navigate = useNavigate();
  const { data: questions, isLoading } = useQuestionsForUser(Number(qId));
  const { data: quiz } = useQuiz(Number(qId));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize timer
  useEffect(() => {
    if (quiz && questions?.length) {
      // Assuming quiz.noOfQuestions and some time per question logic or generic
      // If backend doesn't provide time, let's assume 2 mins per question
      const totalTime = questions.length * 2 * 60;
      setTimeLeft(totalTime);
    }
  }, [quiz, questions]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 && questions?.length) {
      submitQuiz(); // Auto submit
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, questions]);

  // Prevent refresh/back
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const formatTime = (seconds: number) => {
    const mm = Math.floor(seconds / 60);
    const ss = seconds % 60;
    return `${mm}:${ss < 10 ? "0" : ""}${ss}`;
  };

  const handleOptionSelect = (option: string) => {
    if (!questions) return;
    const currentQ = questions[currentQuestionIndex];
    setAnswers({
      ...answers,
      [currentQ.quesId]: option,
    });
  };

  const submitQuiz = async () => {
    setIsSubmitting(true);
    // Format answers for backend
    // Backend expects list of questions with 'givenAnswer' set
    const evalQuestions = questions?.map((q) => ({
      ...q,
      givenAnswer: answers[q.quesId] || "",
    }));

    try {
      const response = await api.post("/question/eval-quiz", evalQuestions);
      const result = response.data;

      Swal.fire({
        title: "Quiz Submitted!",
        html: `
          <div style="text-align: left;">
             <p>Marks Got: <b>${result.marksGot}</b></p>
             <p>Correct Answers: <b>${result.correctAnswers}</b></p>
             <p>Questions Attempted: <b>${result.attempted}</b></p>
          </div>
        `,
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      }).then(() => {
        navigate("/user-dashboard/0");
      });
    } catch {
      Swal.fire("Error", "Failed to submit quiz", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmSubmit = () => {
    Swal.fire({
      title: "Submit Quiz?",
      text: "Are you sure you want to finish the quiz?",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      icon: "question",
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        submitQuiz();
      }
    });
  };

  if (isLoading || !questions) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex flex-col">
      {/* Header with Timer */}
      <div className="bg-white dark:bg-zinc-800 shadow-sm p-4 sticky top-0 z-10 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white truncate max-w-xs sm:max-w-md">
            {quiz?.title}
          </h2>
          <div className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        <div className="flex items-center space-x-2 text-xl font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg">
          <Timer size={24} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 container mx-auto p-4 max-w-4xl py-8">
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-700 p-8">
          <div className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
            <span dangerouslySetInnerHTML={{ __html: currentQuestion.content }} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              currentQuestion.option1,
              currentQuestion.option2,
              currentQuestion.option3,
              currentQuestion.option4,
            ]
              .filter(Boolean)
              .map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    answers[currentQuestion.quesId] === option
                      ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400"
                      : "border-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                        answers[currentQuestion.quesId] === option
                          ? "bg-indigo-600 border-indigo-600"
                          : "border-gray-400"
                      }`}
                    >
                      {answers[currentQuestion.quesId] === option && (
                        <div className="h-2.5 w-2.5 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{option}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 p-4">
        <div className="container mx-auto max-w-4xl flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg disabled:opacity-50"
          >
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={confirmSubmit}
              disabled={isSubmitting}
              className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-sm disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <CheckCircle size={20} className="mr-2" />
              )}
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))
              }
              className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
            >
              Next
              <ChevronRight size={20} className="ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
