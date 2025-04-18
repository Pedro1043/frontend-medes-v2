import { useState } from 'react';

const PatientRegister= () => {
  const [dni, setDNI] = useState('');
  const [name, setName] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [fecnacimiento, setFecnacimiento] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [estcivil, setEstcivil] = useState('');
  const [direccion, setDireccion] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [antecedentes, setAntecedentes] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !dni|| !name || !apellidoP || !apellidoM|| !fecnacimiento  || !age || !gender || !estcivil || !direccion || !phone || !email || !antecedentes) {
      setMessage('Por favor, complete todos los campos.');
      return;
    }

    // Aquí agregarías la lógica para enviar los datos a una API o guardarlos en una base de datos
    console.log('Datos del paciente:', { dni, name,apellidoP, apellidoM, fecnacimiento, age, gender, estcivil, direccion, phone, email, antecedentes });
    setMessage('¡Registro completado con éxito!');
    
    // Limpiar el formulario después de guardar los datos
    setDNI('');
    setName('');
    setApellidoP('');
    setApellidoM('');
    setFecnacimiento('');
    setAge('');
    setGender('');
    setEstcivil('');
    setDireccion('');
    setPhone('');
    setEmail('');
    setAntecedentes('');
  };

  return (
      <div className="registration-container">
      <h2>Registro de Pacientes</h2>
      <form onSubmit={handleSubmit} className="form-grid">
      <div>
          <label htmlFor="dni">DNI: </label>
          <input
            type="number"
            id="dni"
            placeholder="Número de DNI"
            value={dni}
            onChange={(e) => setDNI(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Nombre: </label>
          <input
            type="text"
            id="name"
            placeholder="Nombre del paciente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="apellidoP">Apellido Paterno: </label>
          <input
            type="text"
            id="apellidoP"
            placeholder="Ingresar Apellido"
            value={apellidoP}
            onChange={(e) => setApellidoP(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="apellidoM">Apellido Materno: </label>
          <input
            type="text"
            id="apellidoM"
            placeholder="Ingresar Apellido"
            value={apellidoM}
            onChange={(e) => setApellidoM(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fecnacimiento">Fecha de Nacimiento: </label>
          <input
            type="text"
            id="fecnacimiento"
            placeholder="Ingresar Fecha de nacimiento"
            value={fecnacimiento}
            onChange={(e) => setFecnacimiento(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Edad: </label>
          <input
            type="number"
            id="age"
            placeholder="Edad del paciente"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Género: </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Seleccione el género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>
        <div>
          <label htmlFor="estcivil">Estado Civil: </label>
          <select
            id="estcivil"
            value={estcivil}
            onChange={(e) => setEstcivil(e.target.value)}
          >
            <option value="">Seleccionar</option>
            <option value="soltero">Soltero</option>
            <option value="casado">Casado</option>
          </select>
        </div>

        <div>
          <label htmlFor="direccion">Direccion: </label>
          <input
            type="text"
            id="direccion"
            placeholder="Ingresar Direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Teléfono: </label>
          <input
            type="tel"
            id="phone"
            placeholder="Número de teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico: </label>
          <input
            type="email"
            id="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="antecedentes">Antecedentes Familiares: </label>
          <textarea
            id="antecedentes"
            value={antecedentes}
            onChange={(e) => setAntecedentes(e.target.value)}
          ></textarea>
        </div>
        {message && <div className="message">{message}</div>}
        <button type="submit" className="submit-button">Registrar Paciente</button>
      </form>
    </div>
  );
};

export default PatientRegister;