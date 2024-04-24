import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

const MedicalExp = () => {
    const [speciality, setSpeciality] = useState<string>("")
    const [id_card, setCard] = useState<File>()
    const [bio, SetBio] = useState<string>("")
    const [medical_id, setMedicalId] = useState<string>('')

    const navigate = useNavigate()

    const location = useLocation()
    const state = location.state

    const handleMedExp = async () => {
        try {
            const formData = new FormData();
            formData.append('speciality', speciality)
            formData.append('id_card', id_card as File)
            formData.append('bio', bio)
            formData.append('medical_id', medical_id)

            const result = await axios.post("http://localhost:3000/api/doctors/createMedExp/" + state, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/login");
        } catch (error) {
            console.log(error)
        }
    }

    const handleImageChange = (e) => {
        setCard(e.target.files[0]);
    };

    return (
        <div className="grid grid-cols-[1fr_2fr] ">
            <div
                className="opacity-90 shadow text-white"
                style={{
                    backgroundImage: `url(/Capture.PNG)`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="bg-[#1DBED3] h-full bg-opacity-50 p-12">
                    <h1 className="text-6xl font-bold">HOPE FOR HUMANITY</h1>
                    <p className="text-2xl">Welcome to hope for humanity</p>
                </div>
            </div>
            <div className="bg-gray-100 p-8 min-h-screen flex justify-center items-center overflow-x-hidden">
                <form className="w-full max-w-2xl p-6 bg-white rounded-md shadow-lg overflow-hidden">
                    <div className="img-holder w-20 ml-60">
                        <img src={id_card ? URL.createObjectURL(id_card as any) : "https://th.bing.com/th/id/OIP.NwGHskMmp_x6hEeaxzXvWgHaFW?w=242&h=180&c=7&r=0&o=5&pid=1.7"} alt="" id="img" className="img" />
                        <input type="file" accept="image/*" onChange={(e) => { handleImageChange(e) }} />
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="p-3 w-full md:w-1/2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Speciality
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text"
                                placeholder="Generalist, Cardiology, Neurology..."
                                onChange={(e) => { setSpeciality(e.target.value) }}
                            />
                        </div>

                    </div>


                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="p-3 w-full md:w-1/2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                Bio
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text"
                                placeholder="..."
                                onChange={(e) => { SetBio(e.target.value) }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="p-3 w-full md:w-1/2">
                            <label className="block text-gray-700 text-sm font-bold mb-1">
                                MedicalId
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                                type="text"
                                placeholder="..."
                                onChange={(e) => { setMedicalId(e.target.value) }}
                            />
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mt-4">
                        <div className="w-full px-3">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleMedExp()
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MedicalExp