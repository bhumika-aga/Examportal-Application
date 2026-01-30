import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addQuiz, deleteQuiz, getQuiz, getQuizzes, getQuizzesOfCategory, updateQuiz } from "../services/quiz.service";

export const useQuizzes = () => {
  return useQuery({
    queryKey: ["quizzes"],
    queryFn: getQuizzes,
  });
};

export const useQuizzesOfCategory = (cId: number | null) => {
  return useQuery({
    queryKey: ["quizzes", "category", cId],
    queryFn: () => getQuizzesOfCategory(cId!),
    enabled: !!cId,
  });
};

export const useQuiz = (qId: number) => {
  return useQuery({
    queryKey: ["quiz", qId],
    queryFn: () => getQuiz(qId),
    enabled: !!qId,
  });
};

export const useAddQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast.success("Quiz added successfully");
    },
    onError: () => {
      toast.error("Failed to add quiz");
    },
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast.success("Quiz updated successfully");
    },
    onError: () => {
      toast.error("Failed to update quiz");
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast.success("Quiz deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete quiz");
    },
  });
};
