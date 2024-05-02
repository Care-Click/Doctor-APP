import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface formField {
    id_card: File;
    bio: string;
    medical_id: string;
    doctor_id: number;
}

const MedicalExp = () => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm<formField>();
    const navigate = useNavigate();
    const location = useLocation();
    const {doctorId} = location.state;

    const [selectedFile, setSelectedFile] = useState(null); // State to store selected file

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }
    const handleMedExp = async (data) => {
        try {
            const formData = new FormData();
            formData.append('id_card', data.id_card[0]);
            formData.append('bio', data.bio);
            formData.append('medical_id', data.medical_id);

            const result = await axios.post(
                `http://localhost:3000/api/doctors/createMedExp/${doctorId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-[1fr_2fr]">
            <div
                className="opacity-90 shadow text-white flex items-center justify-center"
                style={{
                    backgroundImage: `url('/src/assets/images/Capture1.PNG')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '100vh'
                }}
            >
                <div className="text-center  mb-20">
                    <h1 className="text-6xl font-bold text-[#1DBED3]">HOPE FOR HUMANITY</h1>
                    <p className="text-2xl mt-4 text-[#1DBED3]">Please provide you medical experience</p>
                </div>
            </div>
            <div className="bg-blue-100 p-8 min-h-screen flex justify-center items-center overflow-x-hidden">
                <form
                    className="w-full max-w-lg p-6  bg-blue-200 rounded-md shadow-lg overflow-hidden"
                    onSubmit={handleSubmit(handleMedExp)}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Card</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register('id_card', { required: true })}
                            onChange={(e) => {
                                handleImageChange(e);
                                getValues('id_card');
                            }}
                            className="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-400"
                        />
                        {errors.id_card && <p className="text-red-500 text-xs italic">Please select an image.</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
                        <input
                            {...register('bio', { required: true })}
                            className="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-400"
                            type="text"
                            placeholder="Enter bio..."
                        />
                        {errors.bio && <p className="text-red-500 text-xs italic">Please enter a bio.</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Medical ID</label>
                        <input
                            {...register('medical_id', { required: true })}
                            className="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-400"
                            type="text"
                            placeholder="Enter medical ID..."
                        />
                        {errors.medical_id && <p className="text-red-500 text-xs italic">Please enter a medical ID.</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-[#1DBED3] text-white py-2 px-4  rounded hover:bg-blue-600 ml-80"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MedicalExp;
