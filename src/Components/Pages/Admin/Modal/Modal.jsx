import { useEffect, useState } from "react";
import axios from "../../../../api/axiosInstance";
import {
  Namevalidation,
  Passwordvalidation,
  emailvalidation,
} from "../../../Utiles/validation";
import Swal from "sweetalert2";

const Modal = ({
  isOpen,
  Name,
  Email,
  Id,
  setId,
  editModal,
  onClose,
  fetchdata,
}) => {

  const isEdit = editModal === true;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  // Prefill data in edit mode
  useEffect(() => {

    if (isOpen && isEdit) {
      setName(Name || "");
      setEmail(Email || "");
    }

    if (isOpen && !isEdit) {
      resetForm();
    }

  }, [isOpen, isEdit, Name, Email]);


  function resetForm() {
    setName("");
    setEmail("");
    setPassword("");
    setNameError("");
    setEmailError("");
    setPassError("");
  }


  function handleClose() {
    resetForm();
    setId(null);
    onClose();
  }


  function handleNameChange(e) {
    const value = e.target.value;
    setName(value);
    setNameError(Namevalidation(value) || "");
  }

  function handleEmailChange(e) {
    const value = e.target.value;
    setEmail(value);
    setEmailError(emailvalidation(value) || "");
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    setPassError(Passwordvalidation(value) || "");
  }


  async function handleSubmit(e) {

    e.preventDefault();

    const nameErr = Namevalidation(name);
    const emailErr = emailvalidation(email);
    const passErr = !isEdit ? Passwordvalidation(password) : "";

    setNameError(nameErr || "");
    setEmailError(emailErr || "");
    setPassError(passErr || "");

    if (nameErr || emailErr || passErr) return;


    try {

      if (isEdit) {

        const res = await axios.patch(`/edit/${Id}`, {
          name,
          email,
        });

        if (res.data.success) {

          Swal.fire({
            icon: "success",
            title: "User Updated Successfully",
            timer: 1500,
            showConfirmButton: false,
          });

        }

      } else {

        const res = await axios.post("/register", {
          name,
          email,
          password,
        });

        if (res.data.success) {

          Swal.fire({
            icon: "success",
            title: "User Added Successfully",
            timer: 1500,
            showConfirmButton: false,
          });

        }

      }

      fetchdata();
      handleClose();

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: error.response?.data?.message || "Something went wrong",
      });

    }

  }


  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">

      <div className="bg-white w-96 p-6 rounded-xl shadow-xl">

        <h2 className="text-xl font-bold mb-4 text-center">
          {isEdit ? "Edit User" : "Add User"}
        </h2>


        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>

            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={handleNameChange}
              className="w-full border p-2 rounded"
            />

            {nameError && (
              <p className="text-red-500 text-sm">{nameError}</p>
            )}

          </div>


          {/* Email */}
          <div>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border p-2 rounded"
            />

            {emailError && (
              <p className="text-red-500 text-sm">{emailError}</p>
            )}

          </div>


          {/* Password only for Add */}
          {!isEdit && (

            <div>

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full border p-2 rounded"
              />

              {passError && (
                <p className="text-red-500 text-sm">{passError}</p>
              )}

            </div>

          )}


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isEdit ? "Update User" : "Add User"}
          </button>


        </form>


        {/* Close Button */}
        <button
          onClick={handleClose}
          className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>


      </div>

    </div>
  );

};

export default Modal;