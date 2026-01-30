import api from "../api/axios";
import type { Quiz } from "../types";

export const getQuizzes = async (): Promise<Quiz[]> => {
  const response = await api.get<Quiz[]>("/quiz/");
  return response.data;
};

export const addQuiz = async (quiz: Partial<Quiz>): Promise<Quiz> => {
  const response = await api.post<Quiz>("/quiz/", quiz);
  return response.data;
};

export const deleteQuiz = async (qId: number): Promise<void> => {
  await api.delete(`/quiz/${qId}`);
};

export const getQuiz = async (qId: number): Promise<Quiz> => {
  const response = await api.get<Quiz>(`/quiz/${qId}`);
  return response.data;
};

export const updateQuiz = async (quiz: Quiz): Promise<Quiz> => {
  const response = await api.put<Quiz>("/quiz/", quiz);
  return response.data;
};

export const getQuizzesOfCategory = async (cId: number): Promise<Quiz[]> => {
  const response = await api.get<Quiz[]>(`/quiz/category/${cId}`);
  return response.data;
};
