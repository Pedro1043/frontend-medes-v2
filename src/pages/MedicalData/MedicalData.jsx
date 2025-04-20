import { useState, useEffect } from 'react';
import { getAllPatientsService } from '../../services/patients';
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

  // Obtener la lista de pacientes al cargar el componente
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getAllPatientsService();
        setPatients(patientsData);
        setFilteredPatients(patientsData); // Inicialmente, mostrar todos los pacientes
      } catch (error) {
        console.error('Error al obtener pacientes:', error);
      }
    };

    fetchPatients();
  }, []);

  // Filtrar pacientes según el valor de búsqueda
  useEffect(() => {
    const results = patients.filter((patient) =>
      patient.nombresPaciente.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.apellidoPaterno.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.dniPaciente.includes(searchValue)
    );
    setFilteredPatients(results);
  }, [searchValue, patients]);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchValue(''); // Limpiar la barra de búsqueda
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedPatient || !altura || !peso || !tension || !fr || !fc || !temperatura) {
      setMessage('Por favor, complete todos los campos.');
      return;
    }

    console.log('Datos médicos registrados:', {
      paciente: selectedPatient,
      altura,
      peso,
      tension,
      fr,
      fc,
      temperatura,
    });

    setMessage('¡Registro completado con éxito!');
    setSelectedPatient(null);
    setAltura('');
    setPeso('');
    setTension('');
    setFr('');
    setFc('');
    setTemperatura('');
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

        {message && <div className="message">{message}</div>}
        <button type="submit" className="submit-button">
          Registrar Datos Médicos
        </button>
      </form>
    </div>
  );
};

export default MedicalData;