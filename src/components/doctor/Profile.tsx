import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiEdit,
  FiSave,
} from "react-icons/fi";
import { SlBriefcase } from "react-icons/sl";
import { TfiAgenda } from "react-icons/tfi";
import Location from "./Location";

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
  latitude: number;
  longitude: number;
  place: {
    city: string;
    country: string;
    district: string;
  };
}

const Profile = () => {
  const [doctor, setDoctor] = useState<Doctor>();
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    place: { country: "", city: "", district: "" },
  });

  const { register, handleSubmit } = useForm<Partial<Doctor>>();
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const [imageUrl, setImage] = useState("");
  const [id_card, setCard] = useState("");

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
    let token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:3000/api/doctors/getDoctor",
        { headers: { token: token } }
      );

      setDoctor(response.data);
      setLocation(JSON.parse(response.data.location));
    } catch (error) {
      console.log(error);
    }
  };

  // Function to submit form data
  const onSubmit = async (data: Partial<Doctor>) => {
    let token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("imageUrl", imageUrl);
    formData.append("id_card", id_card);
    formData.append("location", JSON.stringify(location));

    try {
      await axios.put(
        "http://localhost:3000/api/doctors/updateProfile",
        formData,
        { headers: { token: token, "Content-Type": "multipart/form-data" } }
      );
      // Once the update is successful, exit edit mode
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" bg-gray-200 p-10 text-[#0C3178]">
      <div className="container mx-auto">
        <div className="bg-white shadow rounded-lg p-9 mx-auto">
          <div className="flex flex-col items-center ">
            {editMode ? (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                <img
                  src={imageUrl ? imageUrl : doctor?.profile_picture}
                  alt="Click to Upload"
                  onClick={handleImageClick}
                  style={{ cursor: "pointer", width: "100px", height: "100px" }}
                  className="w-32 h-32 bg-gray-300 rounded-full  "
                />
              </div>
            ) : (
              <img
                src={doctor?.profile_picture}
                alt="Avatar"
                className="w-32 h-32 bg-gray-300 rounded-full "
              />
            )}
            <div className="flex ml-5 mt-7">
              {editMode ? (
                <input
                  className="text-2xl font-semibold italic text-[#003bac] text-center mb-7 border border-gray-400 rounded  h-10"
                  defaultValue={doctor?.FullName}
                  {...register("FullName")}
                />
              ) : (
                <h2 className="text-2xl font-semibold italic  text-center mt-3">
                  {doctor?.FullName}
                </h2>
              )}
            </div>
            <div className="flex items-center mb-4">
              <SlBriefcase className=" mr-4" size={23} />
              <p className="text-xl text-[#009688] font-bold text-center italic ">
                {doctor?.speciality}
              </p>
            </div>
          </div>
          <div className="flex justify-center ">
            <div className="flex-1 p-5 border border-gray-400 shadow-lg">
              <div className=" mb-8 flex items-center font-bold">
                <FiPhone className=" mr-2" size={25} />
                {editMode ? (
                  <input
                    className="text-[#009688] border border-gray-400 rounded w-40 h-10 mt-4"
                    defaultValue={doctor?.phone_number}
                    {...register("phone_number")}
                  />
                ) : (
                  <p className="text-[#009688]" style={{ fontSize: "1.1em" }}>
                    {doctor?.phone_number}
                  </p>
                )}
              </div>

              <div className="mb-8 flex items-center font-bold">
                <FiMail className=" mr-2" size={25} />
                {editMode ? (
                  <input
                    className="text-[#009688] border border-gray-400 rounded mt-2 w-80 h-10"
                    defaultValue={doctor?.email}
                    {...register("email")}
                  />
                ) : (
                  <p className="text-[#009688]" style={{ fontSize: "1.1em" }}>
                    {doctor?.email}
                  </p>
                )}
              </div>

              <div className="mb-4 flex items-center font-bold">
                <FiMapPin className=" mr-2" size={25} />
                {editMode ? (
                  <Location setLocation={setLocation} />
                ) : (
                  <p
                    className="text-[#009688]  "
                    style={{ fontSize: "1.1em" }}
                  >{`${location.place.country ? location.place.country : ""}-${
                    location.place.city ? location.place.city : ""
                  }-${
                    location.place.district ? location.place.district : ""
                  }`}</p>
                )}
              </div>
            </div>
            <div style={{ flex: "2" }} className="  border border-gray-400 ">
              <div className="bg-white shadow rounded-lg p-6">
                {editMode ? (
                  <div className="flex items-center">
                    <TfiAgenda className=" mr-5" size={23} />
                    <input
                      className="text-[#009688] mt-1 text-center font-bold border border-gray-400 rounded p-1 h-40 w-80"
                      defaultValue={doctor?.MedicalExp?.bio}
                      {...register("bio")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center ">
                    <TfiAgenda className=" mr-4" size={23} />
                    <p className="text-[#009688] text-center font-bold mx-auto">
                      {doctor?.MedicalExp?.bio}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center lg:justify-start ml-12">
  <div
    style={{ width: "300px", height: "200px" }}
    className="flex justify-center lg:justify-start mr-4" // Added margin-right for spacing
  >
    {editMode ? (
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          ref={inputRef}
          style={{ display: "none" }}
        />
        <img
          src={id_card ? id_card : doctor?.MedicalExp?.id_card[0]}
          alt="Click to Upload"
          onClick={handleImage}
          style={{
            cursor: "pointer",
            width: "300px",
            height: "200px",
          }}
        />
      </div>
    ) : (
      <img
        src={doctor?.MedicalExp?.id_card[0]}
        alt="Avatar"
        className="mt-4 lg:mt-0 lg:ml-0 mb-3 "
      />
    )}
  </div>
  <div
    style={{ width: "300px", height: "200px" }}
    className="flex justify-center lg:justify-start"
  >
    <img
      src={doctor?.MedicalExp?.id_card[1]}
      alt="Avatar"
      className="mt-4 lg:mt-0 lg:ml-0 mb-3 "
    />
  </div>
</div>

            </div>
          </div>
          <div className="flex justify-center mb-20 mt-4">
            {editMode ? (
              <button
                className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center max-h-12"
                onClick={handleSubmit(onSubmit)}
              >
                <FiSave className="w-6 h-6 mr-1" />
                Save
              </button>
            ) : (
              <button
                className="bg-[#1DBED3] text-white py-2 px-3 rounded hover:bg-blue-600 flex items-center max-h-12"
                onClick={() => setEditMode(true)}
              >
                <FiEdit className="w-6 h-6 mr-1" />
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
