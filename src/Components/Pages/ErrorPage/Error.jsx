import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate()
    return(
             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl md:text-3xl font-light text-gray-600 mt-2">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/Profile"> 
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
        Go Back Home
      </button>
        </Link>
    </div>
    )
}
