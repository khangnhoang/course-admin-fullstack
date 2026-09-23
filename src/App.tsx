import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthPage } from "./pages/auth/AuthPage";
import CourseManagementPage from "./pages/course-management/CourseManagementPage";
import { HomePage } from "./pages/home/HomePage";
import { Toaster } from "@/components/ui/toast";
import type { AuthUser } from "@/types/auth";
import { getMe } from "@/services/authServices";

function App() {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  function handleAuthenticated(user: AuthUser) {
    setCurrentUserEmail(user.email);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setCurrentUserEmail(null);
  }

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const user = await getMe();

        setCurrentUserEmail(user.email);
      } catch {
        localStorage.removeItem("token");
        setCurrentUserEmail(null);
      }
    }

    restoreSession();
  }, []);

  return (
    <div className="min-h-screen">
      <Header currentUserEmail={currentUserEmail} onLogout={handleLogout} />

      <Toaster />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <AuthPage mode="login" onAuthenticated={handleAuthenticated} />
          }
        />

        <Route
          path="/register"
          element={
            <AuthPage mode="register" onAuthenticated={handleAuthenticated} />
          }
        />

        <Route path="/admin/courses" element={<CourseManagementPage />} />
      </Routes>
    </div>
  );
}

export default App;
