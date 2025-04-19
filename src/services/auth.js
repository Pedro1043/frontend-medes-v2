export const loginService = async (username, password) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v2/user/getUser?username=${username}&password=${password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 401){
            throw new Error("Credenciales incorrectas");
        }

        if(!response.ok){
            throw new Error("Error al autenticar el usuario");
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Error logeandose: ", error);
        throw error;
    }
}