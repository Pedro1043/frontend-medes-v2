import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/login';
import PatientRegister from './pages/Patients/PatientRegister';
import MedicalData from './pages/MedicalData/MedicalData';
import HistoryViewer from './pages/MedicalHistory/HistoryViewer';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Navbar from './components/shared/Navbar/Navbar';

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navbar />
            <h1>Bienvenido a la aplicación</h1>
          </ProtectedRoute>
        }
      />
      <Route
        path="/patientRegister"
        element={
          <ProtectedRoute>
            <Navbar />
            <PatientRegister />
          </ProtectedRoute>
        }
      />
      <Route
        path="/MedicalData"
        element={
          <ProtectedRoute>
            <Navbar />
            <MedicalData />
          </ProtectedRoute>
        }
      />
      <Route
        path="/HistoryViewer"
        element={
          <ProtectedRoute>
            <Navbar />
            <HistoryViewer />
          </ProtectedRoute>
        }
      />
     </Routes>
    </BrowserRouter>
  )
}

export default App
