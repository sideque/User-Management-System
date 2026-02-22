import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { emailvalidation, Namevalidation, Passwordvalidation } from "../Utiles/validation";
import axiosInstance from "../../api/axiosInstance";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const App = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passError, setPassError] = useState("");

    function handleNameChange(e) {
        setName(e.target.value)
        const error = Namevalidation(e.target.value)

        if (error) {
            setNameError(error)
        }else{
            setNameError("")
        }
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
        const error = Passwordvalidation(e.target.value);

        if (error) {
            setPassError(error)
        }else{
            setPassError("");
        }
    }

    function handleEmailchange(e) {
        setEmail(e.target.value)
        const error = emailvalidation(e.target.value);

        if (error) {
            setError(error)
        }else{
            setError("")
        }
    }

    const register = async (e) => {
        e.preventDefault()
        const nameErr = Namevalidation(name);
        const emailErr = emailvalidation(email);
        const passErr = Passwordvalidation(password);

        setNameError(nameErr || "");
        setError(emailErr || "");
        setPassError(passErr || "");

        if (nameErr || emailErr || passErr) {
            return
        }

        try {
            const res = await axiosInstance.post("/register", { email, password, name })

            if (res.status) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "User registered successfully!",
                    confirmButtonText: "OK"
                });
            }
            navigate("/login")
        } catch (error) {
            console.log(error, "Error from Register")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response?.data?.message || "Something went wrong !"
            })
        }
    }

    return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Register</h2>

        <form method='post' onSubmit={register} id="loginForm" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              onChange={handleNameChange}
              type="name"
              id="name"
              name="name"
              className={`w-full px-3 py-2 mb-5 border ${nameError ? "border-red-600 focus:ring-red-600 focus:border-red-600" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2  transition duration-200`}
              placeholder="Enter your email"
            />
            {nameError ? (<p className='text-red-600'>{nameError}</p>) : ("")}
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              onChange={handleEmailchange}
              type="email"
              id="email"
              name="email"
              className={`w-full px-3 py-2 border ${error ? "border-red-500 focus:ring-red-600 focus:border-red-600" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2  transition duration-200`}
              placeholder="Enter your email"
            />
            {error ? (<p className='text-red-600'>{error}</p>) : ('')}
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
              className={`w-full px-3 py-2 border ${passError ? "border-red-600 focus:border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2  transition duration-200`}
              placeholder="Enter your password"
            />
            {passError ? (<p className='text-red-600'>{passError}</p>) : ("")}
          </div>



          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-500 transition duration-200 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default App;