import { useState, useEffect } from 'react';
import { getAllPatientsService } from '../../services/patients';
import { registerMedicalDataService } from '../../services/medicalRecords';
import './MedicalData.css';

const MedicalData = () => {
  const [patients, setPatients] = useState([]); // Lista de pacientes
  const [selectedPatient, setSelectedPatient] = useState(null); // Paciente seleccionado
  const [searchValue, setSearchValue] = useState(''); // Valor de búsqueda
  const [filteredPatients, setFilteredPatients] = useState([]); // Pacientes filtrados
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [tension, setTension] = useState('');
  const [fr, setFr] = useState('');
  const [fc, setFc] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [message, setMessage] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!selectedPatient || !altura || !peso || !tension || !fr || !fc || !temperatura) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    // Crear el objeto con los datos médicos
    const medicalData = {
      fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
      altura: parseFloat(altura),
      peso: parseFloat(peso),
      tension,
      frecuenciaRespiratoria: parseInt(fr, 10),
      frecuenciaCardiaca: parseInt(fc, 10),
      temperatura: parseFloat(temperatura),
      patient: {
        idPaciente: selectedPatient.idPaciente,
      },
    };

    try {
      const result = await registerMedicalDataService(medicalData);
      console.log('Datos médicos registrados:', result);
      setMessage('¡Datos médicos registrados con éxito!');
      // Limpiar el formulario
      setSelectedPatient(null);
      setAltura('');
      setPeso('');
      setTension('');
      setFr('');
      setFc('');
      setTemperatura('');
    } catch (error) {
      setError('Error al registrar los datos médicos. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="registration-container">
      <h2>DATOS MÉDICOS</h2>
      <form onSubmit={handleSubmit} className="form-grid">
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
                  {patient.nombresPaciente} {patient.apellidoPaterno} {patient.apellidoMaterno} - DNI: {patient.dniPaciente}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedPatient && (
          <div>
            <h3>Paciente Seleccionado:</h3>
            <p>
              {selectedPatient.nombresPaciente} {selectedPatient.apellidoPaterno} {selectedPatient.apellidoMaterno} - DNI:{' '}
              {selectedPatient.dniPaciente}
            </p>
          </div>
        )}

        <div>
          <label htmlFor="altura">Altura:</label>
          <input
            type="text"
            id="altura"
            placeholder="Altura del paciente"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="peso">Peso:</label>
          <input
            type="text"
            id="peso"
            placeholder="Peso del paciente"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="tension">Tensión:</label>
          <input
            type="text"
            id="tension"
            placeholder="Tensión del paciente"
            value={tension}
            onChange={(e) => setTension(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="fr">Frecuencia Respiratoria:</label>
          <input
            type="text"
            id="fr"
            placeholder="Frecuencia Respiratoria"
            value={fr}
            onChange={(e) => setFr(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="fc">Frecuencia Cardiaca:</label>
          <input
            type="text"
            id="fc"
            placeholder="Frecuencia Cardiaca"
            value={fc}
            onChange={(e) => setFc(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="temperatura">Temperatura:</label>
          <input
            type="text"
            id="temperatura"
            placeholder="Temperatura"
            value={temperatura}
            onChange={(e) => setTemperatura(e.target.value)}
          />
        </div>

        {error && <div className="error">{error}</div>}
        {message && <div className="message">{message}</div>}
        <button type="submit" className="submit-button">
          Registrar Datos Médicos
        </button>
      </form>
    </div>
  );
};

export default MedicalData;