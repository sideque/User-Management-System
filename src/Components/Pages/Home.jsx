import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  async function handlelogout() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      dispatch(logout());
    } else {
      return;
    }
  }

  return (
    <div>
      <header className="bg-white shadow-lg shimmer">
        <div className="max-w-4xl px-4">
          <div className="flex justify-between items-center py-4 w-screen px-14">
            <div className="flex items-center space-x-2">
              {user?.profileImage ? (
                <img
                  src={`http://localhost:3000/uploads/${user.profileImage}`}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover border-2 border-blue-500 cursor-pointer"
                  onClick={() => navigate("/profile")}
                />
              ) : (
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}

              <h1 className="text-xl font-bold text-gray-900">Profile</h1>
            </div>

            <button
              onClick={handlelogout}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center mt-20 bg-dark">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {user.email || "Guest"}
        </h2>
        <button
          className="mt-5 px-6 py-2 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={() => navigate("/profile")}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default Home;
