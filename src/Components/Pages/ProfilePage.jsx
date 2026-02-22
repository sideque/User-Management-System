import { logout } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";
import axiosMultipart from "../../api/axiosMultipart";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { setUser } from "../../redux/authSlice";

const ProfilePage = () => {
  const ImageInputRef = useRef(null);
  const dispatch = useDispatch();
  const [button, setButton] = useState(false);
  const [Image, setImage] = useState(null);
  const [lastUpdated, setlastUpdated] = useState(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  async function handlelogout() {
    const result = await Swal.fire({
      title: "Are you sure ?",
      text: "You will be logged out of your accound.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      dispatch(logout());
      navigate("/login");
    } else {
      return;
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get("/userDetails");

        if (res?.data?.success) {
          const user = res.data.user;
          dispatch(setUser(user));
          setName(user.name);
          setlastUpdated(user.updatedAt);

          if (user.profileImage) {
            setImage(`http://localhost:3000/uploads/${user.profileImage}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [dispatch]);

  function handleChangeImage(e) {
    setButton(true);
    const selectedImage = e.target.files[0];
    if (!selectedImage) return;
    setFile(selectedImage);
    const previewUrl = URL.createObjectURL(selectedImage);
    setImage(previewUrl);
  }

  async function handleUpload() {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axiosMultipart.post("/upload", formData);
      const imageUrl = `http://localhost:3000/uploads/${res.data.image}`;

      if (res.data.success) {
        setImage(imageUrl);
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated",
          confirmButtonText: "OK",
        });
      }
      setButton(false);
    } catch (error) {
      console.log(error, "Error");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Invalid credentials.",
        confirmButtonText: "Try Again",
      });
    }
  }

  function handleImageClick() {
    ImageInputRef.current.click();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
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

      <div className="w-screen h-28 flex items-center justify-center mt-32">
        {Image ? (
          <img
            onClick={handleImageClick}
            src={Image}
            className="rounded-full border-4 bg-white size-56 mb-20"
          />
        ) : (
          <div
            className="rounded-full 
            border-4 
            border-gray-300 
            bg-gradient-to-br from-white via-gray-100 to-gray-200 
            w-56 h-56 
            mb-20 
            flex items-center justify-center 
            cursor-pointer
            shadow-md
            text-gray-700 
            font-semibold 
            text-2xl 
            uppercase 
            tracking-wider
            select-none
            transition 
            duration-300 
            hover:bg-gradient-to-br hover:from-blue-400 hover:via-blue-500 hover:to-blue-600
            hover:text-white"
            onClick={handleImageClick}
          >
            Upload
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          name="image"
          ref={ImageInputRef}
          onChange={handleChangeImage}
          className="hidden"
        />
      </div>
      {button ? (
        <div className="w-screen mt-8 flex justify-center">
          <button
            onClick={handleUpload}
            className="px-5  py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-colors duration-200"
          >
            Update
          </button>
        </div>
      ) : (
        ""
      )}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{`Welcome back, ${name} !`}</h2>
          <p className="text-lg text-gray-600">
            Here's your profile information
          </p>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            {lastUpdated
              ? new Date(lastUpdated).toLocaleString()
              : "loading..."}
          </p>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
