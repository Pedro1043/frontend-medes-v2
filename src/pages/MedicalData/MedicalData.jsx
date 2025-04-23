import { useState, useEffect } from 'react';
import { getAllPatientsService } from '../../services/patients';
import { registerMedicalDataService } from '../../services/medicalRecords';
import './MedicalData.css';

const MedicalData = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [tension, setTension] = useState('');
  const [fr, setFr] = useState('');
  const [fc, setFc] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [examenClinicoGeneral, setExamenClinicoGeneral] = useState('');
  const [tiempoEnfermedad, setTiempoEnfermedad] = useState('');
  const [signosSintomasPrincipales, setSignosSintomasPrincipales] = useState('');
  const [relatoCronologico, setRelatoCronologico] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  useEffect(() => {
    if (searchValue.trim() === '') {
      setFilteredPatients([]);
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
    setSearchValue('');
    setFilteredPatients([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!selectedPatient || !altura || !peso || !tension || !fr || !fc || !temperatura || !examenClinicoGeneral || !tiempoEnfermedad || !signosSintomasPrincipales || !relatoCronologico) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    const medicalData = {
      fecha: new Date().toISOString().split('T')[0],
      altura: parseFloat(altura),
      peso: parseFloat(peso),
      tension,
      frecuenciaRespiratoria: parseInt(fr, 10),
      frecuenciaCardiaca: parseInt(fc, 10),
      temperatura: parseFloat(temperatura),
      examenClinicoGeneral,
      tiempoEnfermedad,
      signosSintomasPrincipales,
      relatoCronologico,
      patient: {
        idPaciente: selectedPatient.idPaciente,
      },
    };

    try {
      const result = await registerMedicalDataService(medicalData);
      console.log('Datos médicos registrados:', result);
      setMessage('¡Datos médicos registrados con éxito!');
      setSelectedPatient(null);
      setAltura('');
      setPeso('');
      setTension('');
      setFr('');
      setFc('');
      setTemperatura('');
      setExamenClinicoGeneral('');
      setTiempoEnfermedad('');
      setSignosSintomasPrincipales('');
      setRelatoCronologico('');
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

        <div>
          <label htmlFor="examenClinicoGeneral">Examen Clínico General:</label>
          <textarea
            id="examenClinicoGeneral"
            placeholder="Describa el examen clínico general"
            value={examenClinicoGeneral}
            onChange={(e) => setExamenClinicoGeneral(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="tiempoEnfermedad">Tiempo de Enfermedad:</label>
          <input
            type="text"
            id="tiempoEnfermedad"
            placeholder="Tiempo de enfermedad"
            value={tiempoEnfermedad}
            onChange={(e) => setTiempoEnfermedad(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="signosSintomasPrincipales">Signos y Síntomas Principales:</label>
          <textarea
            id="signosSintomasPrincipales"
            placeholder="Describa los signos y síntomas principales"
            value={signosSintomasPrincipales}
            onChange={(e) => setSignosSintomasPrincipales(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label htmlFor="relatoCronologico">Relato Cronológico:</label>
          <textarea
            id="relatoCronologico"
            placeholder="Describa el relato cronológico"
            value={relatoCronologico}
            onChange={(e) => setRelatoCronologico(e.target.value)}
          ></textarea>
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