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