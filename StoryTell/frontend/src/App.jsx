import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<h1 className="p-4">Strona główna</h1>} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;