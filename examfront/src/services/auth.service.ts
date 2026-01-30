import api from "../api/axios";
import type { JwtResponse, LoginRequest, User } from "../types";

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>("/current-user");
  return response.data;
};

export const generateToken = async (loginData: LoginRequest): Promise<JwtResponse> => {
  const response = await api.post<JwtResponse>("/generate-token", loginData);
  return response.data;
};

export const registerUser = async (user: Partial<User>): Promise<User> => {
  const response = await api.post<User>("/user/", user);
  return response.data;
};
