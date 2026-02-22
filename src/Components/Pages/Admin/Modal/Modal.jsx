import { useEffect, useState } from "react";
import axios from "../../../../api/axiosInstance";
import { Namevalidation, Passwordvalidation, emailvalidation } from '../../../Utiles/validation';
import Swal from "sweetalert2";

const Modal = ({ isOpen, Name, Id, setId, Email, editModel, onClose }) => {

    if (!isOpen) return null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [nameError, setNameError] = useState("");
    const [passError, setPassError] = useState("");

    useEffect(() => {
        if (isOpen && editModel) {
            setName(Name || "");
            setEmail(Email || "");
        }
    }, [isOpen, editModel, Name, Email]);

    function handleNameChange(e) {
        setName(e.target.value);
        const error = Namevalidation(e.target.value);
        setNameError(error || "");
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
        const error = emailvalidation(e.target.value);
        setError(error || "");
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
        const error = Passwordvalidation(e.target.value);
        setPassError(error || "");
    }

    async function handleEditForm(e) {

        e.preventDefault();

        const nameErr = Namevalidation(name);
        const emailErr = emailvalidation(email);

        setNameError(nameErr || "");
        setError(emailErr || "");

        if (nameErr || emailErr) return;

        try {

            const updateData = { name, email };

            const result = await axios.patch(`/edit/${Id}`, updateData);

            if (result.data.success) {

                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'User updated successfully',
                    timer: 2000
                });

                onClose();

            }

        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message
            });

        }
    }

    async function handleFormSubmission(e) {

        e.preventDefault();

        const nameErr = Namevalidation(name);
        const emailErr = emailvalidation(email);
        const passErr = Passwordvalidation(password);

        setNameError(nameErr || "");
        setError(emailErr || "");
        setPassError(passErr || "");

        if (nameErr || emailErr || passErr) return;

        try {

            const res = await axios.post("/register", { email, password, name });

            Swal.fire({
                icon: 'success',
                title: 'Registered successfully'
            });

            onClose();

        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: error.response?.data?.message
            });

        }
    }

    return (

        <div className="fixed inset-0 flex items-center justify-center z-50 custom-blur">

            <div className="bg-blue-200 p-6 rounded">

                <form onSubmit={editModel ? handleEditForm : handleFormSubmission}>

                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Enter name"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter email"
                    />

                    {!editModel && (
                        <input
                            type="password"
                            onChange={handlePasswordChange}
                            placeholder="Enter password"
                        />
                    )}

                    <button type="submit">
                        {editModel ? "Edit" : "Register"}
                    </button>

                </form>

                <button onClick={() => {
                    onClose();
                    setId(null);
                }}>
                    Close
                </button>

            </div>

        </div>

    )

}

export default Modal;