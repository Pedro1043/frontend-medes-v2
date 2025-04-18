import React, { useState } from 'react';

// Lista simulada de pacientes para hacer la búsqueda
const patients = [
  { id: 1, dni: '12345678', apellido: 'Gomez', nombre: 'Juan' },
  { id: 2, dni: '87654321', apellido: 'Gomez', nombre: 'Ana' },
  { id: 3, dni: '45678912', apellido: 'Ramirez', nombre: 'Luis' },
];

const HistoryViewer = () => {
  const [searchType, setSearchType] = useState('dni'); // 'dni' o 'apellido'
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]); // Lista de resultados
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setError(''); // Resetear el mensaje de error

    if (!searchValue) {
      setError('Por favor, ingrese un valor de búsqueda.');
      return;
    }

    // Filtrar la lista de pacientes basada en el tipo de búsqueda
    const filteredPatients = patients.filter((patient) =>
      searchType === 'dni'
        ? patient.dni === searchValue
        : patient.apellido.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (filteredPatients.length === 0) {
      setError('No se encontraron pacientes con los criterios especificados.');
    } else {
      console.log("No se pudo filtrar");
    }
  };

  return (
    <div className="search-container">
      <h2>Buscar Paciente</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="searchType">Buscar por:</label>
          <select
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="dni">DNI</option>
            <option value="apellido">Apellido</option>
          </select>
        </div>
        <div>
          <label htmlFor="searchValue">Valor de búsqueda:</label>
          <input
            type="text"
            id="searchValue"
            placeholder={`Ingrese ${searchType}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <button type="submit">Buscar</button>
      </form>

      {error && <div className="error">{error}</div>}

      <div className="results">
        <h3>Resultados de la búsqueda:</h3>
        <ul>
          {results.map((patient) => (
            <li key={patient.id}>
              {patient.nombre} {patient.apellido} - DNI: {patient.dni}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryViewer;