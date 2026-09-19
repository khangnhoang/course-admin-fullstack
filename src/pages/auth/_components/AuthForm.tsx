import { useState } from "react";
import type { AuthInput, AuthMode } from "../../../types/auth";

type AuthFormProps = {
  mode: AuthMode;
  onSubmit: (input: AuthInput) => Promise<void>;
  error?: string;
};

type FloatingInputProps = {
  type: "email" | "password";
  value: string;
  onChange: (value: string) => void;
  idleLabel: string;
  activeLabel: string;
};

function FloatingInput({
  type,
  value,
  onChange,
  idleLabel,
  activeLabel,
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || value.length > 0;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="
          w-full rounded-xl border border-slate-700
          bg-slate-900 px-4 pb-3 pt-5
          text-slate-100 outline-none
          transition-all duration-300
          focus:border-indigo-500
          focus:ring-2 focus:ring-indigo-500/20
        "
      />

      <label
        className={`
          pointer-events-none absolute left-4
          transition-all duration-300
          ${
            isFloating
              ? "-top-2 bg-slate-950 px-1 text-xs text-indigo-400"
              : "top-1/2 -translate-y-1/2 text-slate-500"
          }
        `}
      >
        {isFloating ? activeLabel : idleLabel}
      </label>
    </div>
  );
}

export function AuthForm({ mode, onSubmit, error }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit({
      email,
      password,
    });
  };

  const isRegister = mode === "register";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-md space-y-6
          rounded-2xl border border-slate-800
          bg-slate-950/80 p-8
          shadow-2xl shadow-black/40
          backdrop-blur
        "
      >
        <div>
          <p className="text-sm font-medium text-indigo-400">Course Admin</p>

          <h1 className="mt-2 text-3xl font-semibold text-white">
            {isRegister ? "Create account" : "Welcome back"}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            {isRegister
              ? "Create an account to get started."
              : "Sign in to continue."}
          </p>
        </div>

        <div className="space-y-5">
          <FloatingInput
            type="email"
            value={email}
            onChange={setEmail}
            idleLabel="Your email"
            activeLabel="Email"
          />

          <FloatingInput
            type="password"
            value={password}
            onChange={setPassword}
            idleLabel="Your password"
            activeLabel="Password"
          />
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}

        <button
          type="submit"
          className="
            w-full rounded-xl bg-indigo-500
            px-4 py-3 font-medium text-white
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-indigo-400
            hover:shadow-lg hover:shadow-indigo-500/20
            active:translate-y-0
          "
        >
          {isRegister ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
