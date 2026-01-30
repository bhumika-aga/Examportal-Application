import api from "../api/axios";
import type { Category } from "../types";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>("/category/");
  return response.data;
};

export const addCategory = async (category: Partial<Category>): Promise<Category> => {
  const response = await api.post<Category>("/category/", category);
  return response.data;
};

export const deleteCategory = async (cId: number): Promise<void> => {
  await api.delete(`/category/${cId}`);
};

export const getCategory = async (cId: number): Promise<Category> => {
  const response = await api.get<Category>(`/category/${cId}`);
  return response.data;
};
