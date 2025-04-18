import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
        {/* Menú de navegación */}
        <nav className="menu">
          <ul>
           <li><Link to="/patientRegister">Paciente</Link></li>
           <li><Link to="/MedicalData">Datos Medicos</Link></li>
           <li><Link to="/HistoryViewer">Buscar Paciente</Link></li>
          </ul>
        </nav>
    </div>

  );
};

export default Navbar;