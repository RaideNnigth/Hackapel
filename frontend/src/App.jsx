import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import CriarPlanilha from "./pages/CriarPlanilha";
import OfcAdminAgendas from "./pages/OfcAdminAgendas";
import OficialAdministrativoDashboard from "./pages/OficialAdministrativoDashboard";
import OfcAdminConsultas from "./pages/OfcAdminConsultas";
import PatientDashboard from "./pages/PatientDashboard";
import PatientAppointments from "./pages/PatientAppointments";
import PatientNewsletter from "./pages/PatientNewsletter";
import PatientUpdate from "./pages/PatientUpdate";
import AdminDashboard from "./pages/AdminDashboard";
import PatientRegistration from "./pages/PatientRegistration";

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
        <Route path="/patient/appointments" element={<PatientAppointments />} />
        <Route path="/patient/newsletter" element={<PatientNewsletter />} />
        <Route path="/patient/update" element={<PatientUpdate />} />
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/patient/registration" element={<PatientRegistration />} />
      </Routes>
    </BrowserRouter>
  );
}
