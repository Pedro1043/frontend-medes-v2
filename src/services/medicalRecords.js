export const registerMedicalDataService = async (medicalData) => {
    try {
        const response = await fetch('http://localhost:8081/api/v1/medicalData/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicalData),
        });

        if (!response.ok) {
            throw new Error('Error al registrar los datos médicos');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error registrando los datos médicos:', error);
        throw error;
    }
};
export const getMedicalDataByPatientIdService = async (patientId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/v1/medicalData/patient/${patientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los datos médicos del paciente');
        }

        const medicalData = await response.json();
        return medicalData;
    } catch (error) {
        console.error('Error obteniendo los datos médicos:', error);
        throw error;
    }
};