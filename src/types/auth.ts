export type AuthInput = {
  email: string;
  password: string;
};

export type AuthMode = "login" | "register";

export type AuthUser = {
  id: string;
  email: string;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};