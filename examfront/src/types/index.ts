// Domain Types

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string; // For registration
  profile: string; // image filename
  enabled: boolean;
  authorities: Authority[];
}

export interface Authority {
  authority: string;
}

export interface Role {
  roleId: number;
  roleName: string;
}

export interface Category {
  cId: number;
  title: string;
  description: string;
}

export interface Quiz {
  qId: number;
  title: string;
  description: string;
  maxMarks: string;
  noOfQuestions: string;
  active: boolean;
  category: Category;
}

export interface Question {
  quesId: number;
  content: string;
  image: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  givenAnswer?: string;
  quiz?: Quiz;
}

// API Response Types
export interface JwtResponse {
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
