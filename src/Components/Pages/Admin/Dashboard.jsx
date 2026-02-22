import Navbar from "./Navbar";
import TableRow from "./TableRow";
import axiosInstance from "../../../api/axiosMultipart";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { logout } from "../../../redux/authSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axiosInstance.get("/getData")
                if (res.data.success) {
                    setData(res.data.data)
                }else{
                    return navigate('/login')
                }
            } catch (error) {
                return alert(error, "Error from fetchdata dashboard")
            }
        }
        fetchdata();
    },[]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axiosInstance.get("/search", { params: { q: input } })
                if (res.data.success) {
                    setData(res.data.data)
                }else{
                    return navigate("/login")
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Unauthorized!",
                    text: "You are not allowed to access this page.",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        }
        fetchdata();
    }, [input]);

    async function handleLogout() {
        const result = await Swal.fire({
            title: "Are You Sure",
            text: "You will be logout from Your Page",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes,Logout",
            cancelButtonText: "Cancel"
        });

        if (result.isConfirmed) {
            dispatch(logout());
            navigate("/login")
        }else{
            return
        }
    }

    async function handleDelete(data) {
        try {
        const result = await Swal.fire({
            title: "Are You Sure",
            text: "Do You Wand to Delete it",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes,Delete",
            cancelButtonText: "Cancel"
        })

        if (result.isConfirmed) {
            const res = await axiosInstance.delete(`/delete/${data}`)
            setData(res.data.data)
        }else{
            return
        }
        } catch (error) {
            console.log(error, "Error from handleDelete")
        }
    }

    return (
        <div>
            <Navbar handleLogout={handleLogout}/>
            <TableRow data={data} setData={setData} setInput={setInput} del={handleDelete} />
        </div>
    )
}

export default Dashboard;   