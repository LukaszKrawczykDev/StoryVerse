const API = 'http://localhost:5050'; //TODO ZMIENIC NA ENV

export const login = async ({ email, password }) => {
    const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
        localStorage.setItem('token', data.token);
        return data;
    } else {
        throw new Error(data.error || 'Błąd logowania');
    }
};

export const getMe = async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const res = await fetch(`${API}/auth/me`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Błąd połączenia z backendem" }));
        throw new Error(err.error || 'Błąd logowania');
    }
};