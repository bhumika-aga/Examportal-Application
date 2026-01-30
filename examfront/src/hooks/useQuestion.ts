import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getQuestionsOfQuiz,
  getQuestionsOfQuizForUser,
  addQuestion,
  deleteQuestion,
  getQuestion,
  updateQuestion,
} from "../services/question.service";
import toast from "react-hot-toast";

export const useQuestions = (qId: number) => {
  return useQuery({
    queryKey: ["questions", qId],
    queryFn: () => getQuestionsOfQuiz(qId),
    enabled: !!qId,
  });
};

export const useQuestionsForUser = (qId: number) => {
  return useQuery({
    queryKey: ["questions", "user", qId],
    queryFn: () => getQuestionsOfQuizForUser(qId),
    enabled: !!qId,
    staleTime: 60 * 60 * 1000, // Cache for 1 hour
    gcTime: 60 * 60 * 1000, // Keep in cache (renamed from cacheTime in v5)
  });
};

export const useQuestion = (quesId: number) => {
  return useQuery({
    queryKey: ["question", quesId],
    queryFn: () => getQuestion(quesId),
    enabled: !!quesId,
  });
};

export const useAddQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addQuestion,
    onSuccess: (_, variables) => {
      // Invalidate questions for the specific quiz
      queryClient.invalidateQueries({ queryKey: ["questions", variables.quiz?.qId] });
      toast.success("Question added successfully");
    },
    onError: () => {
      toast.error("Failed to add question");
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateQuestion,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["questions", variables.quiz?.qId] });
      toast.success("Question updated successfully");
    },
    onError: () => {
      toast.error("Failed to update question");
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => {
      // We might not know the qId here easily to be specific, so maybe invalidate all questions or refill.
      // Actually we can pass qId if we want to be specific, or just invalidate all 'questions'.
      // Since queryKey is ['questions', qId], invalidating ['questions'] should work for all?
      // No, strictly exact matching unless specific overrides.
      // Better to invalidate everything starting with 'questions'
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast.success("Question deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete question");
    },
  });
};
