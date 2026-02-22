import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoate = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const role = localStorage.getItem("role");


    if (!token) {
        return <Navigate to="/login" replace/>
    }

    if (role === "admin") {
        return <Navigate to="/login" replace/>
    }

    return children;
}

export default ProtectedRoate;