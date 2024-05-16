import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiEdit, FiSave, } from 'react-icons/fi';
import { SlBriefcase } from "react-icons/sl";
import { TfiAgenda } from "react-icons/tfi";
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
    bio: string;
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
    const inputRef = useRef<any>(null);

    const [imageUrl, setImage] = useState("")
    const [id_card, setCard] = useState("")

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

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setCard(reader.result as any);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // Function to handle image click
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleImage = () => {
        inputRef.current.click();
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
        formData.append('data', JSON.stringify(data))
        formData.append('imageUrl', imageUrl)
        formData.append('id_card', id_card)
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
        <section className="min-h-screen bg-white-200 flex justify-center items-center p-10 ">
            <div className="container mx-auto">
                <div className="lg:w-3/4 xl:w-1/2">
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">

                        <div className="p-4 border border-gray-400 bg-blue-100 flex flex-col lg:flex-row">
                            <div className="lg:w-1/2 lg:pr-4">
                                <div className="flex justify-center border border-gray-400 mb-4 shadow-lg">
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
                                                style={{ cursor: 'pointer', width: '100px', height: '100px' }}
                                                className="rounded-full"
                                            />
                                        </div>
                                    ) : (
                                        <img src={doctor?.profile_picture} alt="Avatar" className="rounded-full w-20 h-20 mt-3 mb-3" />
                                    )}
                                    <div className="flex text-center font-bold ml-5 mt-7">
                                        {editMode ? (
                                            <input className="text-2xl font-semibold italic text-red-700 text-center mb-7 border border-gray-400 rounded w-80 h-10"
                                                defaultValue={doctor?.FullName}
                                                {...register("FullName")} />
                                        ) : (
                                            <h2 className="text-2xl font-semibold italic text-red-700 text-center mt-3">{doctor?.FullName}</h2>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-1 border border-gray-400 shadow-lg">
                                    <div className="grid grid-cols-2 gap-y-1">
                                        <div className="mb-4 flex items-center font-bold">
                                            <FiUser className="text-red-700 mr-2" size={25} />
                                            <p className="text-gray-700" style={{ fontSize: '1.1em' }}>{doctor?.gender}</p>
                                        </div>
                                        <div className="mb-4 flex items-center font-bold">
                                            <FiMail className="text-red-700 mr-2" size={25} />
                                            {editMode ? (
                                                <input className="text-gray-700 border border-gray-400 rounded mt-2 w-80" defaultValue={doctor?.email} {...register("email")} />
                                            ) : (
                                                <p className="text-gray-700" style={{ fontSize: '1.1em' }}>{doctor?.email}</p>
                                            )}
                                        </div>
                                        <div className="mb-4 flex items-center font-bold">
                                            <FiPhone className="text-red-700 mr-2" size={25} />
                                            {editMode ? (
                                                <input className="text-gray-700 border border-gray-400 rounded w-40" defaultValue={doctor?.phone_number} {...register("phone_number")} />
                                            ) : (
                                                <p className="text-gray-700" style={{ fontSize: '1.1em' }}>{doctor?.phone_number}</p>
                                            )}
                                        </div>
                                        <div className="mb-4 flex items-center font-bold">
                                            <FiMapPin className="text-red-700 mr-2" size={25} />
                                            {editMode ? (
                                                <Location setLocation={setLocation} />
                                            ) : (
                                                <p className="text-gray-700" style={{ fontSize: '1.1em' }}>{`${location.place.country ? location.place.country : ''}-${location.place.city ? location.place.city : ''}-${location.place.district ? location.place.district : ''}`}</p>
                                            )}
                                        </div>
                                        <div className="mb-4 flex items-center font-bold">
                                            <FiCalendar className="text-red-700 mr-2" size={25} />
                                            <p className="text-gray-700" style={{ fontSize: '1.1em' }}>{doctor?.date_of_birth.slice(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className="lg:w-1/2 ml-10 mt-6 mr-6 lg:justify-start border border-gray-400 shadow-lg">
                                        <div className="p-4 ml-10 bg-blue-100">
                                            <div className="flex items-center mb-4">
                                                <SlBriefcase className="text-red-700 mr-2" size={23} />
                                                <p className="text-xl text-gray-700 font-bold text-center italic">{doctor?.speciality}</p>
                                            </div>
                                            <div className="flex items-center mb-4 ml-5">
                                                {editMode ? (
                                                    <div className="flex items-center">
                                                        <TfiAgenda className="text-red-700 mr-2" size={23} />
                                                        <input
                                                            className="text-gray-700 mt-1 text-center font-bold border border-gray-400 rounded p-1 h-7 w-80"
                                                            defaultValue={doctor?.MedicalExp?.bio}
                                                            {...register("bio")}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center ">
                                                        <TfiAgenda className="text-red-700 mr-2" size={23} />
                                                        <p className="text-gray-700 mt-1 text-center font-bold mx-auto">{doctor?.MedicalExp?.bio}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div style={{ width: '300px', height: '200px' }} className="flex justify-center lg:justify-start ml-12">
                                                {editMode ? (
                                                    <div >
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleInputChange}
                                                            ref={inputRef}
                                                            style={{ display: 'none' }}
                                                        />
                                                        <img
                                                            src={id_card ? id_card : doctor?.MedicalExp?.id_card}
                                                            alt="Click to Upload"
                                                            onClick={handleImage}
                                                            style={{ cursor: 'pointer', width: '300px', height: '200px' }}

                                                        />
                                                    </div>
                                                ) : (
                                                    <img src={doctor?.MedicalExp?.id_card} alt="Avatar" className="mt-4 lg:mt-0 lg:ml-0 mb-3 " />
                                                )}
                                            </div>
                                            <p className="text-gray-700 mb-1 text-center lg:text-left font-bold">{doctor?.MedicalExp?.medical_id}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mb-20">
                                        {editMode ? (
                                            <button className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center max-h-12"
                                                onClick={handleSubmit(onSubmit)}>
                                                <FiSave className="w-6 h-6 mr-1" />
                                                Save
                                            </button>
                                        ) : (
                                            <button className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center max-h-12"
                                                onClick={() => setEditMode(true)}>
                                                <FiEdit className="w-6 h-6 mr-1" />
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;