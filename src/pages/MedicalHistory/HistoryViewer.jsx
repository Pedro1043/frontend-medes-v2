import React, { useState, useEffect } from 'react';
import { getAllPatientsService } from '../../services/patients';
import { getMedicalDataByPatientIdService } from '../../services/medicalRecords';
import './HistoryViewer.css';

const HistoryViewer = () => {
  const [patients, setPatients] = useState([]); // Lista de pacientes
  const [filteredPatients, setFilteredPatients] = useState([]); // Pacientes filtrados
  const [searchValue, setSearchValue] = useState(''); // Valor de búsqueda
  const [selectedPatient, setSelectedPatient] = useState(null); // Paciente seleccionado
  const [medicalData, setMedicalData] = useState(null); // Datos médicos del paciente
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [error, setError] = useState('');

  // Obtener la lista de pacientes al cargar el componente
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getAllPatientsService();
        setPatients(patientsData);
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };

    fetchPatients();
  }, []);

  // Filtrar pacientes según el valor de búsqueda
  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredPatients([]); // Si no hay búsqueda, la lista está vacía
      return;
    }

    const results = patients.filter((patient) =>
      (patient.nombresPaciente?.toLowerCase() || '').includes(searchValue.toLowerCase()) ||
      (patient.apellidoPaterno?.toLowerCase() || '').includes(searchValue.toLowerCase()) ||
      (patient.dniPaciente || '').includes(searchValue)
    );
    setFilteredPatients(results);
  }, [searchValue, patients]);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchValue(''); // Limpiar la barra de búsqueda
    setFilteredPatients([]); // Limpiar la lista de pacientes filtrados
  };

  const handleSearch = async () => {
    if (!selectedPatient) {
      setError('Por favor, seleccione un paciente.');
      return;
    }

    try {
      const data = await getMedicalDataByPatientIdService(selectedPatient.idPaciente);
      setMedicalData(data);
      setIsModalOpen(true); // Abrir el modal
    } catch (error) {
      setError('Error al obtener los datos médicos del paciente.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMedicalData(null);
  };

  return (
    <div className="history-viewer-container">
      <h2>Buscar Paciente</h2>
      <div>
        <label htmlFor="search">Buscar Paciente:</label>
        <input
          type="text"
          id="search"
          placeholder="Buscar por DNI, nombre o apellido"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {filteredPatients.length > 0 && (
          <ul className="patient-list">
            {filteredPatients.map((patient) => (
              <li
                key={patient.dniPaciente}
                onClick={() => handlePatientSelect(patient)}
                className="patient-item"
              >
                {patient.nombresPaciente} {patient.apellidoPaterno} - DNI: {patient.dniPaciente}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedPatient && (
        <div>
          <h3>Paciente Seleccionado:</h3>
          <p>
            {selectedPatient.nombresPaciente} {selectedPatient.apellidoPaterno} - DNI:{' '}
            {selectedPatient.dniPaciente}
          </p>
          <button onClick={handleSearch}>Buscar</button>
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Datos del Paciente</h3>
            <p><strong>Nombre:</strong> {selectedPatient.nombresPaciente}</p>
            <p><strong>Apellido:</strong> {selectedPatient.apellidoPaterno}</p>
            <p><strong>DNI:</strong> {selectedPatient.dniPaciente}</p>
            <h3>Datos Médicos</h3>
            {medicalData && medicalData.length > 0 ? (
              medicalData.map((record, index) => (
                <div key={index} className="medical-record">
                 <p><strong>Fecha:</strong> {record.fecha}</p> 
                 <p><strong>Altura:</strong> {record.altura} m</p>
                 <p><strong>Peso:</strong> {record.peso} kg</p>
                 <p><strong>Tensión:</strong> {record.tension}</p>
                 <p><strong>Frecuencia Respiratoria:</strong> {record.frecuenciaRespiratoria}</p>
                 <p><strong>Frecuencia Cardiaca:</strong> {record.frecuenciaCardiaca}</p>
                 <p><strong>Temperatura:</strong> {record.temperatura} °C</p>
                <hr />
              </div>  
              ))
            ) : (
              <p>No hay datos médicos disponibles.</p>
            )}
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryViewer;