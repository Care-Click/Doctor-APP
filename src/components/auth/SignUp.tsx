import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input/input';
import axios from "../../assets/axiosConfig.js";
import YupPassword from 'yup-password'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  location: string
  role: string
  speciality: string
}

const schema = yup.object().shape({
  email: yup.string().email("invalid email format").required("this field is required"),
  password: yup.string().password().required("this field is required"),
  confirmPassword: yup.string().required("this field is required ").oneOf([yup.ref("password")], "Password do not match")
})

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<formField>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setValue("imageUrl", selectedFile);
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
      formData.append("imageUrl", data.imageUrl);
      formData.append("location", data.location);
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
    <div className="grid grid-cols-2 bg-blue-400 h-screen">
      {/* Left Half */}
      <div className="bg-blue-200 p-20 overflow-x-hidden">
        <form className="max-w-2xl p-10 bg-blue-300 rounded-md shadow-lg mt-14" onSubmit={handleSubmit(handleSignUp)}>
          {/* Email */}
          <div className="p-3">
            <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
            <input
              {...register("email", {
                required: 'Email is required', validate: (value) => {
                  if (!value.includes('@')) {
                    return "Email must include @"
                  }
                }
              })}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
              type="email"
              placeholder="ex: jon.smith@email.com"
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message as string}</div>
            )}
          </div>
          {/* Password */}
          <div className="p-3">
            <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
            <input
              {...register("password", {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must have at least 8 characters',
                }
              })}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
              type="password"
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="text-red-500 text-sm">{errors.password.message as string}</div>
            )}
          </div>
          {/* Confirm Password */}
          <div className="p-3">
            <label className="block text-gray-700 text-sm font-bold mb-1">Confirm Password</label>
            <input
              {...register("confirmPassword", { required: 'ConfirmPassword is required' })}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
              type="password"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <div className="text-red-500 text-sm">{errors.confirmPassword.message as string}</div>
            )}
          </div>
        </form>
      </div>
      {/* Right Half */}
      <div className="bg-blue-200 p-20 overflow-x-hidden">
        <form className="max-w-2xl p-10 bg-blue-300 rounded-md shadow-lg mt-6" onSubmit={handleSubmit(handleSignUp)}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Image input */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => { handleImageChange(e) }}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
              />
            </div>
            {/* Full Name */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">Full Name</label>
              <input
                {...register("FullName", { required: 'FullName is required' })}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
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
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
                type="date"
              />
              {errors.date_of_birth && (
                <div className="text-red-500 text-sm">{errors.date_of_birth.message as string}</div>
              )}
            </div>
            {/* Location */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">Location</label>
              <input
                {...register("location", { required: 'Location is required' })}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
                type="text"
                placeholder="Enter your location"
              />
              {errors.location && (
                <div className="text-red-500 text-sm">{errors.location.message as string}</div>
              )}
            </div>
            {/* Speciality */}
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Speciality
              </label>
              <select
                {...register('speciality')}
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border border-gray-500"
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
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
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
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 border-gray-500"
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 ml-40 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Already have an account? Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
