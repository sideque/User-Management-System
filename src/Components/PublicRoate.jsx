import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const PublicRoute = ({ children }) => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    const isTokenExpired = (token) => {
        try {
            const decoded = jwtDecode(token);
            if (!decoded.exp) return true;
            const now = Date.now() / 1000;
            return decoded.exp < now;
        } catch (error) {
            return true;
        }
    };

    useEffect(() => {
        if (token) {
            if (isTokenExpired(token)) {
                alert("Session expired. Please log in again.")
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("user");
                navigate("/login", { replace: true })
            }
        }
    }, [token, navigate]);

    useEffect(() => {
        if (token && !isTokenExpired(token)) {
            if (role === "admin") {
                navigate("/dashboard", { replace: true })
            } else {
                navigate("/Profile", {replace: true})
            }
        }
    }, [token, role, navigate]);

    return children;
}

export default PublicRoute;