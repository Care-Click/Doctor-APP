import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit, FiSave } from 'react-icons/fi';
import Location from './Location'

interface Doctor {
    id: number;
    FullName: string;
    date_of_birth: string;
    email: string;
    gender: string;
    phone_number: string;
    profile_picture: string;
    speciality: string;
    MedicalExp: {
        bio: string;
        doctorId: number | null;
        id: number | null;
        id_card: string;
        medical_id: string;
    };
}

interface Location {
    latitude: number
    longitude: number,
    place: {
        city: string
        country: string
        district: string
    }
}

const Profile = () => {
    const [doctor, setDoctor] = useState<Doctor>();
    const [location, setLocation] = useState<Location>({
        latitude: 0, longitude: 0, place: { country: "", city: "", district: "" }
    })

    const { register, handleSubmit } = useForm<Partial<Doctor>>();
    const [editMode, setEditMode] = useState(false);
    const fileInputRef = useRef<any>(null);
    const [imageUrl, setImage] = useState("")

    // Function to handle file input change
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Function to handle image click
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        getDoctor();
    }, [editMode, imageUrl]);

    // Function to fetch doctor data
    const getDoctor = async () => {
        let token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:3000/api/doctors/getDoctor', { headers: { "token": token } });
            setDoctor(response.data);

            setLocation(JSON.parse(response.data.location))
        } catch (error) {
            console.log(error);
        }
    };

    // Function to submit form data
    const onSubmit = async (data: Partial<Doctor>) => {

        let token = localStorage.getItem('token');
        const formData = new FormData()
        formData.append('data',JSON.stringify(data))
        formData.append('imageUrl', imageUrl)
        formData.append('location', JSON.stringify(location))


        try {
            await axios.put('http://localhost:3000/api/doctors/updateProfile', formData, { headers: { "token": token, "Content-Type": "multipart/form-data" } })
            // Once the update is successful, exit edit mode
            setEditMode(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="min-h-screen bg-white">
            <div className="container py-5 ">
                <div className="flex justify-center items-center h-full">
                    <div className="lg:w-3/4 xl:w-1/2">
                        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                            <div style={{ maxWidth: 'auto', height: '150px' }} className="flex justify-center bg-gradient-to-r from-blue-400 to-blue-700 text-white p-4">
                                {editMode ? (
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileInputChange}
                                            ref={fileInputRef}
                                            style={{ display: 'none' }}
                                        />
                                        <img
                                            src={imageUrl ? imageUrl : doctor?.profile_picture}
                                            alt="Click to Upload"
                                            onClick={handleImageClick}
                                            style={{ cursor: 'pointer', maxWidth: '130px', maxHeight: '130px' }}
                                            className="rounded-full"
                                        />
                                    </div>
                                ) : (
                                    <img src={doctor?.profile_picture} alt="Avatar" className="rounded-full" />
                                )}
                            </div>
                            <div className="p-4 border border-gray-400  bg-blue-100">
                                <p className="text-xl font-medium text-center mb-4">{doctor?.speciality}</p>
                                <h3 className="text-xl font-semibold mb-2">Information:</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="mb-4 flex text-center font-bold">
                                        {editMode ? (
                                            <input className="text-2xl font-semibold text-center mb-2 border border-gray-400 rounded" defaultValue={doctor?.FullName} {...register("FullName")} />
                                        ) : (
                                            <h2 className="text-2xl font-semibold text-center mb-2">{doctor?.FullName}</h2>
                                        )}
                                    </div>
                                    <div className="mb-4 flex items-center font-bold">
                                        <FiUser className="text-gray-700 mr-2" />
                                        <p className="text-gray-700">{doctor?.gender}</p>
                                    </div>
                                    <div className="mb-4 flex items-center font-bold">
                                        <FiMail className="text-gray-700 mr-2" />
                                        {editMode ? (
                                            <input className="text-gray-700 border border-gray-400 rounded" defaultValue={doctor?.email} {...register("email")} />
                                        ) : (
                                            <p className="text-gray-700">{doctor?.email}</p>
                                        )}
                                    </div>
                                    <div className="mb-4 flex items-center font-bold">
                                        <FiPhone className="text-gray-700 mr-2" />
                                        {editMode ? (
                                            <input className="text-gray-700 border border-gray-400 rounded" defaultValue={doctor?.phone_number} {...register("phone_number")} />
                                        ) : (
                                            <p className="text-gray-700">{doctor?.phone_number}</p>
                                        )}
                                    </div>
                                    <div className="mb-4 flex items-center font-bold">
                                        <FiMapPin className="text-gray-700 mr-2" />
                                        {editMode ? (
                                            <Location setLocation={setLocation} />
                                        ) : (
                                            <p className="text-gray-700">{`${location.place.country?location.place.country:""}-${location.place.city?location.place.city:""}-${location.place.district?location.place.district:""}`}</p>
                                        )}
                                    </div>
                                    <div className="mb-4 flex items-center font-bold">
                                        <FiCalendar className="text-gray-700 mr-2" />
                                        <p className="text-gray-700">{doctor?.date_of_birth.slice(0, 10)}</p>
                                    </div>
                                </div>
                                <div className="flex justify-center mb-2">
                                    {editMode ? (
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 flex items-center ml-2" onClick={handleSubmit(onSubmit)}>
                                            <FiSave className="w-6 h-6 mr-1" />
                                            Save
                                        </button>
                                    ) : (
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 flex items-center" onClick={() => setEditMode(true)}>
                                            <FiEdit className="w-6 h-6 mr-1" />
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div >
                                <div className='p-4 border border-gray-400 bg-blue-100 w-full'>
                                    <p className="text-gray-700 mb-4 text-center font-bold">{doctor?.MedicalExp?.bio}</p>
                                    <p className="text-gray-700 mb-4 text-center font-bold">{doctor?.MedicalExp?.id_card}</p>
                                    <p className="text-gray-700 mb-4 text-center font-bold">{doctor?.MedicalExp?.medical_id}</p>
                                </div>
                            </div>
                            <hr className="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;