import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input/input';
import axios from "../../assets/axiosConfig.js";
import YupPassword from 'yup-password'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Location from "../doctor/Location.tsx";
YupPassword(yup)

interface formField {
  FullName: string
  email: string
  date_of_birth: string
  phone_number: number
  gender: string
  password: string
  confirmPassword: string
  imageUrl: string
  role: string
  speciality: string
}

const schema = yup.object().shape({
  email: yup.string().email("invalid email format").required("this field is required"),
  password: yup.string().password().required("this field is required"),
  confirmPassword: yup.string().required("this field is required ").oneOf([yup.ref("password")], "Password do not match")
})

const SignUp = () => {

  const fileInputRef = useRef(null);
  const [next,setNext] = useState(false)


 
  const [imageUrl,setImage]=useState("data:image/png;base64,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")

  const [file,setfile]=useState('')
  const { register, handleSubmit, formState: { errors }, setValue} = useForm<formField>({
    resolver: yupResolver<any>(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  });


  // Handle submission for the left form
  const handleNext = data => {

    if (data.email && data.password && data.confirmPassword === data.password) {
    setNext(true); }
  };
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    place: { city: "", country: "", district: "" },
  });
  const navigate = useNavigate();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setfile(file)
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setImage(file)
    
    
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handlePhoneNumberChange = (value) => {
    setValue('phone_number', value);
  };

  const handleSignUp = async (data) => {
    try {
      const formData = new FormData();
      formData.append("FullName", data.FullName);
      formData.append("email", data.email);
      formData.append("date_of_birth", data.date_of_birth);
      formData.append("phone_number", data.phone_number);
      formData.append("gender", data.gender);
      formData.append("password", data.password);
      formData.append("role", "doctor");
      formData.append("imageUrl", file );
      formData.append("location", JSON.stringify(location));
      formData.append("speciality", data.speciality);
      
   
      const result = await axios.post("http://localhost:3000/api/doctors/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/medicalExp", { state: { doctorId: result.data.id } });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
       <div className="grid grid-cols-[1fr_2fr] min-h-screen bg-[#f6fff8] ">
      <div
  className="flex items-center justify-center bg-cover bg-no-repeat text-white "
  style={{
    backgroundImage: `url('/src/assets/images/Capture1.png')`,
    backgroundPosition: 'center center',
    minHeight: '100vh',
    maxWidth: '500px',
    width: '100%', 
    
  }}
>
  <div className="flex flex-col justify-center items-center h-full w-full bg-[#ade8f4] bg-opacity-40 p-4">
    <h1 className="text-6xl font-bold">HOPE FOR HUMANITY</h1>
    <h1 className="text-4xl mt-4">Welcome  to CareClick</h1>
  </div>
</div>
      {/* Left Half */}
      {!next && <div className=" p-20 overflow-x-hidden">
        <form className="max-w-2xl p-10 bg-[#ccecd6] rounded-md shadow-lg mt-14" onSubmit={handleSubmit(handleNext)}>
          {/* Email */}
          <div className="p-3">
            <label className="block text-sm font-bold mb-1">Email</label>
            <input
              {...register("email", {
                required: 'Email is required', validate: (value) => {
                  if (!value.includes('@')) {
                    return "Email must include @"
                  }
                }
              })}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
              type="email"
              placeholder="ex: jon.smith@email.com"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message as string}</div>
            )}
          </div>
          {/* Password */}
          <div className="p-3">
            <label className="block  text-sm font-bold mb-1">Password</label>
            <input
              {...register("password", {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                }
              })}
              className="appearance-none block w-full bg-gray-100 border border-gray-500 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 "
              type="password"
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message as string}</div>
            )}
          </div>
          {/* Confirm Password */}
          <div className="p-3">
            <label className="block  text-sm font-bold mb-1">Confirm Password</label>
            <input
              {...register("confirmPassword", { required: 'ConfirmPassword is required' })}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
              type="password"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm">{errors.confirmPassword.message as string}</div>
            )}
          </div>

          <button type="submit" className="block  px-3 py-2 bg-[#1DBED3] hover:bg-blue-700 text-white font-semibold rounded focus:outline-none focus:shadow-outline" onClick={handleNext}>
            Next
          </button>
        </form>
      </div>}
      {/* Right Half */}
      {next && <div className="p-20 overflow-x-hidden  ml-10">
        <form className="max-w-2xl p-10 bg-[#ccecd6] rounded-md shadow-lg mt-6" onSubmit={handleSubmit(handleSignUp)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Image input */}
            
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <img
        src={imageUrl}
        alt="Click to Upload"
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}
        className="border border-gray-300 rounded-md p-2"
      />
   
            {/* Full Name */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
              <input
                {...register("FullName", { required: 'FullName is required' })}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
                type="text"
                placeholder="ex: Smith"
              />
              {errors.FullName && (
                <div className="text-red-500 text-sm">{errors.FullName.message as string}</div>
              )}
            </div>
            {/* Date of Birth */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">Date of Birth</label>
              <input
                {...register("date_of_birth", { required: 'DateOfBirth is required' })}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
                type="date"
              />
              {errors.date_of_birth && (
                <div className="text-red-500 text-sm">{errors.date_of_birth.message as string}</div>
              )}
            </div>
            {/* Location */}
            <div className="col-span-1 ">
              <label className="block text-gray-700 text-sm font-bold mb-1">Location</label>
              <div >
              <Location setLocation={setLocation} />
              </div>
            </div>
            {/* Speciality */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Speciality
              </label>
              <select
                {...register('speciality')}
                className="appearance-none block w-full bg-gray-100 text-gray-700   rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border border-gray-500"
              >
                <option >Select Speciality</option>
                <option value="Generalist">Generalist</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Oncology">Oncology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Endocrinology">Endocrinology</option>
              </select>
            </div>
            {/* Phone Number */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">Phone Number</label>
              <PhoneInput
                {...register("phone_number", { required: 'Phone Number is required' })}
                placeholder="Your Number"
                className="appearance-none block w-full bg-gray-100 text-gray-700  border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
                onChange={handlePhoneNumberChange}
              />
              {errors.phone_number && (
                <div className="text-red-500 text-sm">{errors.phone_number.message as string}</div>
              )}
            </div>
            {/* Gender */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">Gender</label>
              <select
                {...register("gender", { required: 'Gender is required' })}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <div className="text-red-500 text-sm">{errors.gender.message as string}</div>
              )}
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex flex-wrap -mx-3 mt-4">
            <div className="w-full px-3">
              <button
                className="block w-full px-3 py-2 bg-[#1DBED3] hover:bg-blue-700 text-white font-semibold rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="text-center mt-4 text-gray-600">
          Already have an account? {" "}
            <Link to="/login" className="text-[#1DBED3] hover:text-blue-600">
               Sign In
            </Link>
          </div>
        </form>
      </div>}
    </div>
  );
};

export default SignUp;
