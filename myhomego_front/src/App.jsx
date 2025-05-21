import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserMainPage from "./pages/UserMainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
import ChatGpt from "./pages/ChatGpt";
import MainPage from "./pages/MainPage";
import AnnouncementList from "./pages/AnnouncementList";
import Layout from "./components/announcementlist/Layout";
import AnnouncementDetailData from "./pages/AnnoucementDetailData";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/usermain" element={<UserMainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chatGpt" element={<ChatGpt />} />
        <Route element={<Layout />}>
          <Route path="/chatGpt" element={<ChatGpt />} />
          <Route path="/announcementList" element={<AnnouncementList />} />
          <Route path="/announcement/:panId" element={<AnnouncementDetailData/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

