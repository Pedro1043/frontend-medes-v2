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