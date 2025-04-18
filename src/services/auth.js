export const loginService = async (username) => {
    try {
        const response = await fetch(`http://localhost:8080/api/v2/user/getByUsername/${username}`);
        if (!response.ok) {
            throw new Error('Error al autenticar el usuario');
        }
        const user = await response.json();

        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}