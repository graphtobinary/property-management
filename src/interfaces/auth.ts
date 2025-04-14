export type Token = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export interface SigninFormProps {
  email?: string;
  password?: string;
}

export interface ResetFormProps {
  password?: string;
  confirmPassword?: string;
}

export interface AuthState {
  token: string;
  setToken: (token: string) => void;
}
