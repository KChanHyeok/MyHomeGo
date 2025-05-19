import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ChatGpt from "./pages/ChatGpt";
import { Main } from "./pages/Main";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/chatGpt" element={<ChatGpt />} />
      </Routes>
    </BrowserRouter>
  );
}
