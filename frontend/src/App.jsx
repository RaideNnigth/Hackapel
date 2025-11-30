import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import CriarPlanilha from "./pages/CriarPlanilha";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/planilha" element={<CriarPlanilha />} />
      </Routes>
    </BrowserRouter>
  );
}
