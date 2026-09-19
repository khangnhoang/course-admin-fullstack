import { API_URL } from "@/config/api";
import type { AuthInput, AuthSession } from "@/types/auth";

type ApiErrorResponse = {
  message?: string;
};

export async function register(input: AuthInput): Promise<AuthSession> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = (await response.json()) as ApiErrorResponse;

    throw new Error(error.message ?? "Failed to register.");
  }

  return response.json();
}

export async function login(
  input: AuthInput,
): Promise<AuthSession> {
  const response = await fetch(
    `${API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message ?? "Failed to login.",
    );
  }

  return response.json();
}
