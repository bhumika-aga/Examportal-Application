import api from "../api/axios";
import type { Question } from "../types";

export const getQuestionsOfQuiz = async (qId: number): Promise<Question[]> => {
  const response = await api.get<Question[]>(`/question/quiz/all/${qId}`);
  return response.data;
};

export const getQuestionsOfQuizForUser = async (qId: number): Promise<Question[]> => {
  const response = await api.get<Question[]>(`/question/quiz/${qId}`);
  return response.data;
};

export const getQuestionsOfQuizOrAdmin = async (qId: number): Promise<Question[]> => {
  // Admin gets all questions
  const response = await api.get<Question[]>(`/question/quiz/all/${qId}`);
  return response.data;
};

export const addQuestion = async (question: Partial<Question>): Promise<Question> => {
  const response = await api.post<Question>("/question/", question);
  return response.data;
};

export const deleteQuestion = async (quesId: number): Promise<void> => {
  await api.delete(`/question/${quesId}`);
};

export const getQuestion = async (quesId: number): Promise<Question> => {
  const response = await api.get<Question>(`/question/${quesId}`);
  return response.data;
};

export const updateQuestion = async (question: Question): Promise<Question> => {
  const response = await api.put<Question>("/question/", question);
  return response.data;
};
