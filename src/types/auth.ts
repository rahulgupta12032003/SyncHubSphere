export type AuthState = {
  isAuthenticated: boolean;
  user: string | null;
  loading: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  email: string;
  token: string;
  first_name: string;
  last_name: string;
  gender: string;
};
