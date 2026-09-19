import { useState } from "react";
import { useNavigate } from "react-router-dom";

import type { AuthInput, AuthMode, AuthUser } from "@/types/auth";
import { register, login } from "@/services/authServices";
import { AuthForm } from "./_components/AuthForm";

import { toast } from "@/components/ui/toast";

type AuthPageProps = {
  mode: AuthMode;
  onAuthenticated: (user: AuthUser) => void;
};

export function AuthPage({ mode, onAuthenticated }: AuthPageProps) {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (input: AuthInput) => {
    setError("");

    try {
      if (mode === "register") {
        const session = await register(input);

        localStorage.setItem("token", session.token);

        toast.add({
          type: "success",
          title: "Registration successful",
          description: "Redirecting to home in 3 seconds...",
          timeout: 3000,
        });

        setTimeout(() => {
          onAuthenticated(session.user);
          navigate("/");
        }, 3000);

        return;
      }

      if (mode === "login") {
        const session = await login(input);

        localStorage.setItem("token", session.token);

        toast.add({
          type: "success",
          title: "Login successful",
          description: `Welcome back, ${session.user.email}!`,
          timeout: 3000,
        });

        setTimeout(() => {
          onAuthenticated(session.user);
          navigate("/");
        }, 3000);
        return;
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return <AuthForm mode={mode} onSubmit={handleSubmit} error={error} />;
}
