import { useState } from "react";
import { login } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
    const { setUser } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(form);
            window.location.href = "/"; // lub setUser + redirect
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Zaloguj się</h1>

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="mb-2 w-full p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    value={form.password}
                    onChange={handleChange}
                    className="mb-4 w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                >
                    Zaloguj się
                </button>
            </form>
        </div>
    );
}