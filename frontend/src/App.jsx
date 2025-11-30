import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import CriarPlanilha from "./pages/CriarPlanilha";
import AdminAgendas from "./pages/AdminAgendas";
import OficialAdministrativoDashboard from "./pages/OficialAdministrativoDashboard";
import AdminConsultas from "./pages/AdminConsultas";
import PatientDashboard from "./pages/PatientDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/planilha" element={<CriarPlanilha />} />
        <Route path="/admin-agendas" element={<AdminAgendas />} />
        <Route path="/admin/dashboard" element={<OficialAdministrativoDashboard />} />
        <Route path="/admin-confirmacoes" element={<AdminConsultas />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
