

export const onLogin = async (userLogin) => {
    let message;
    try {
        const response = await fetch("http://localhost:7070/usersApi/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLogin),
        })

        message = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: message,
            }
        }
        return {
            success: false,
            message: message,
        }
    } catch (error) {
        throw new Error(`Error al iniciar Sesión: ${error}`);
    }
}