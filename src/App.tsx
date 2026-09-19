import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthPage } from "./pages/auth/AuthPage";
import CourseManagementPage from "./pages/course-management/CourseManagementPage";
import { HomePage } from "./pages/home/HomePage";
import { Toaster } from "@/components/ui/toast";
import type { AuthUser } from "@/types/auth";

function App() {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  function handleAuthenticated(user: AuthUser) {
    setCurrentUserEmail(user.email);
  }

  return (
    <div className="min-h-screen">
      <Header currentUserEmail={currentUserEmail} />

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
