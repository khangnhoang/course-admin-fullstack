import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthPage } from "./pages/auth/AuthPage";
import CourseManagementPage from "./pages/course-management/CourseManagementPage";
import { HomePage } from "./pages/home/HomePage";

function App() {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header currentUserEmail={currentUserEmail} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={
            <AuthPage mode="login" />
          }
        />

        <Route path="/register" element={<AuthPage mode="register" />} />

        <Route path="/admin/courses" element={<CourseManagementPage />} />
      </Routes>
    </div>
  );
}

export default App;