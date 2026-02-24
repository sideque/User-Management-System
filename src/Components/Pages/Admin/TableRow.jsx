import React, { useEffect, useState } from 'react'
import Modal from './Modal/Modal'
import axiosInstance from '../../../api/axiosInstance'
const TableRow = ({ data, setData, setInput, del }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [Id, setId] = useState(null)
    const fetchdata = async () => {
        try {
            const res = await axiosInstance.get("/getData")
            if (res.data.success) {
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchdata()
    }, []);


    return (
        <div className="p-8 px-16">
            <Modal 
                isOpen={isModalOpen}
                Id={Id} 
                setId={setId} 
                Name={name} 
                Email={email}
                editModal={editModal}
                fetchdata={fetchdata} 
                onClose={() => { 
                    setModalOpen(false);
                    setEditModal(false); 
                    setName(""); 
                    setEmail("") 
                    }} 
                />
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 ">
                <div className='flex w-full gap-4'>
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-slate-400 text-lg">🔍</span>
                        </div>
                        <input onChange={(e) => setInput(e.target.value)} type="text" placeholder="Search users..." className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm  shadow-sm transition-all duration-200" />
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-11 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                        <span className="text-lg">🔍</span>
                        Search
                    </button>
                </div>

                <button onClick={() => setModalOpen(true)} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 cursor-pointer">
                    <span className="text-lg">➕</span>
                    Add New User
                </button>

            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-lg">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {data ? data.map((data, key) => (
                            <tr key={key} className="hover:bg-slate-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                                            {data.profileImage?(
                                                <img
                                                src={data.profileImage ? `http://localhost:3000/uploads/${data.profileImage}` : '/default-avatar.png'}
                                                alt={data.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                                />

                                            ):(<span className="text-white font-bold text-sm">{(data.name.slice(0, 2).toUpperCase())}</span>)}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">{data.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{data.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(data.createdAt).toDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex items-center justify-end space-x-3">
                                        <button onClick={() => { setEditModal(true); setName(data.name); setEmail(data.email); setId(data._id); setModalOpen(true) }} className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-2 rounded-lg transition-all duration-200 hover:scale-110 shadow-sm cursor-pointer">
                                            ✏️
                                        </button>
                                        <button onClick={() => del(data._id, data.name, data.email)} className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-lg transition-all duration-200 hover:scale-110 shadow-sm cursor-pointer">
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            ""
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableRow


