import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import CriarPlanilha from "./pages/CriarPlanilha";
import OfcAdminAgendas from "./pages/OfcAdminAgendas";
import OficialAdministrativoDashboard from "./pages/OficialAdministrativoDashboard";
import OfcAdminConsultas from "./pages/OfcAdminConsultas";
import PatientDashboard from "./pages/PatientDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/planilha" element={<CriarPlanilha />} />
        <Route path="/ofc-admin/agendas" element={<OfcAdminAgendas />} />
        <Route path="/ofc-admin/dashboard" element={<OficialAdministrativoDashboard />} />
        <Route path="/ofc-admin/confirmacoes" element={<OfcAdminConsultas />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
