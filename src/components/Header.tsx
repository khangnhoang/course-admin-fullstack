import { Link } from "react-router-dom";

type HeaderProps = {
  currentUserEmail: string | null;
  onLogout: () => void;
};

export function Header({ currentUserEmail, onLogout }: HeaderProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold text-white">
          CourseAdmin
        </Link>

        <div className="flex items-center gap-3">
          {currentUserEmail ? (
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-300">
                Hi,{" "}
                <span className="font-medium text-indigo-400">
                  {currentUserEmail}
                </span>
              </p>

              <button
                onClick={onLogout}
                className="text-sm text-slate-400 transition hover:text-white cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
              >
                Register
              </Link>

              <div className="h-6 w-px bg-slate-700" />

              <Link
                to="/admin/courses"
                className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                CourseMgmt
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
