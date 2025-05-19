// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemberMainPage from "./pages/MemberMainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import ChatGpt from "./pages/ChatGpt";
import Main from "./pages/Main";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/memberMain" element={<MemberMainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chatGpt" element={<ChatGpt />} />
      </Routes>
    </BrowserRouter>
  );
}
