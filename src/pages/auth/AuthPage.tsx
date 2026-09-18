import type { AuthMode, AuthInput } from "../../types/auth";

import { AuthForm } from "./_components/AuthForm";

type AuthPageProps = {
  mode: AuthMode;
};

export function AuthPage({ mode }: AuthPageProps) {
    const handleSubmit = async (input: AuthInput) => {
        console.log("AuthPage handleSubmit", input);
    }

    return (
        <AuthForm mode={mode} onSubmit={handleSubmit} />
    )
}