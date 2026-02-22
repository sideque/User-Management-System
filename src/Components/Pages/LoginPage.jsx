import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [passerror, setPassError] = useState("");

    const dispatch = useDispatch();
    
    function handleEmailchange(e) {
        const value = e.target.value 
        setEmail(value);

        if (value.trim() === "") {
            setError("Email is required")
        }else{
            setError("");
        }
    }

    function handlePasswordChange(e) {
        const value = e.target.value
        setPassword(value);
        
        if (value.trim() === "") {
            setPassError("Password is Required")
        }else{
            setPassError("")
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            let isValidated = true;
            if (email === "") {
                const emailErr = "Email is Required"
                setError(emailErr)
                isValidated = false
            }else{
                setError("")
            }

            if (password === "") {
                const passErr = "Password is Required";
                setPassError(passErr)
                isValidated = false;
            }else{
                setPassError("")
            }

            if (!isValidated) return
            const res = await axiosInstance.post("/login", {email, password})
            dispatch(setCredentials({
                token: res.data.login.token,
                user: res.data.login.user,
                role: res.data.login.user.role,
            }))

            if (res.data.login.user.role === "admin") {
                navigate("/dashboard")
            }else{
                navigate("/Home")
            }

            if (res.data.success) {
                Swal.fire({
                title: 'Login Successful!',
                text: res.data.message || 'You are now logged in.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
    Swal.fire({
        title: 'Login Failed',
        text: error.response?.data?.message || 'Invalid credentials.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
    }

    return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Sign In</h2>

        <form method='post' onSubmit={handleSubmit} id="loginForm" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              onChange={handleEmailchange}
              type="email"
              id="email"
              name="email"
              className={`w-full px-3 py-2 border rounded-md ${error ? "border-red-600 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200`}
              placeholder="Enter your email"
            />
            {error ? (<p className='text-red-500'>{error}</p>) : ("")}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              type="password"
              id="password"
              name="password"
              className={`w-full px-3 py-2 border ${passerror ? "border-red-600 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200`}
              placeholder="Enter your password"
            />
            {passerror ? (<p className='text-red-500'>{passerror}</p>) : ("")}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">

            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-500 transition duration-200 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage;