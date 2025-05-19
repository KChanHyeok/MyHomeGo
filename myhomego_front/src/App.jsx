// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemberMainPage from "./pages/MemberMainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatGpt from "./pages/ChatGpt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MemberMainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatGpt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
