export const registerPatientService = async (patientData) => {
    try {
        const response = await fetch('http://localhost:8081/api/v1/patient/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData)
        });

        if(!response.ok){
            throw new Error("Error al registrar el paciente");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error registrando el paciente: ", error);
        throw error;
    }
}

export const getAllPatientsService = async () => {
    try {
        const response = await fetch('http://localhost:8081/api/v1/patient/getAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(!response.ok){
            throw new Error("Error al obtener la lista de pacientes");
        }

        const patiens = await response.json();
        return patiens;
    } catch (error) {
        console.error("Error obteniendo pacientes: ", error);
        throw error;
    }
}