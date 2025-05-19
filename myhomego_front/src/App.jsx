<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatGpt from "./pages/ChatGpt";
import MainPage from "./pages/MainPage";
=======
// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMainPage from "./pages/UserMainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import ChatGpt from "./pages/ChatGpt";
import Main from "./pages/Main";
>>>>>>> 520b4907297b92327cd6aadaf43606f8d6961ba4

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<MainPage />} />
=======
        <Route path="/" element={<Main />} />
        <Route path="/userMain" element={<UserMainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
>>>>>>> 520b4907297b92327cd6aadaf43606f8d6961ba4
        <Route path="/chatGpt" element={<ChatGpt />} />
      </Routes>
    </BrowserRouter>
  );
}
