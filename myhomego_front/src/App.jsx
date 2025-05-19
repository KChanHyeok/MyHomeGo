import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatGpt from "./pages/ChatGpt";
import MainPage from "./pages/MainPage";
import AnnouncementList from "./pages/AnnouncementList";
import Layout from "./components/announcementlist/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<Layout />}>
          <Route path="/chatGpt" element={<ChatGpt />} />
          <Route path="/announcementList" element={<AnnouncementList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
