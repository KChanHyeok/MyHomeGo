
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatGpt from "./pages/ChatGpt";
import MainPage from "./pages/MainPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chatGpt" element={<ChatGpt />} />
      </Routes>
    </BrowserRouter>
  );
}

