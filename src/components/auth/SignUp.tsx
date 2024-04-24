import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-number-input/input';
import PasswordChecklist from "react-password-checklist"
import { Link } from "react-router-dom";
import axios from "axios"

const SignUp = () => {

  const [FullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [phone_number, setPhone] = useState()
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState("")
  const [valid, setValid] = useState<Boolean>(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImage] = useState(null)
  const [location, setLocation] = useState('')
  // Handle the file upload logic with state as needed
  const navigate = useNavigate()

  if (valid) {
    var handleSignUp = async () => {
      if (password !== confirmPassword) {
        return alert('Password should be the same')
      }
      // Sign up logic
      try {
        const formData = new FormData();
        formData.append("FullName", FullName);
        formData.append("email", email);
        formData.append("date_of_birth", date_of_birth)
        formData.append('phone_number', phone_number as any)
        formData.append("gender", gender)
        formData.append("password", password);
        formData.append("role", "doctor");
        formData.append("imageUrl", imageUrl as any);
        formData.append("location", location);

        const result = await axios.post("http://localhost:3000/api/doctors/signup", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        // Navigate to the desired location with state
        navigate("/medicalExp", { state: result.data.id });
      } catch (error) {

        console.log(error);
      }
    };
  }



  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handlePhoneNumberChange = (value) => {
    setPhone(value);
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
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="img-holder w-20 ml-60">
              <img src={imageUrl ? URL.createObjectURL(imageUrl) : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="" id="img" className="img" />
              <input type="file" accept="image/*" onChange={(e) => { handleImageChange(e) }} />
            </div>
            {/* Full Name */}
            <div className="p-3 w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Full Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                placeholder="ex: Smith"
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            {/* Date of Birth */}
            <div className="p-3 w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Date of Birth
              </label>
              <input
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="date"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            {/* Location */}
            <div className="p-3 w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Location</label>
              <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter your location"
              />
            </div>
            {/* phone_number */}
            <div className="p-3 w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-1" >Phone Number</label>
              <PhoneInput className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                onChange={handlePhoneNumberChange}
              />
            </div>
            {/* Gender */}
            <div className="p-3 w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-1">Gender</label>
              <select className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {/* Email */}
            <div className="p-3 w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="ex: jon.smith@email.com"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            {/* Password */}
            <div className="p-3 w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="••••••••"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
              />
              <PasswordChecklist
                rules={["minLength", "specialChar", "number", "capital"]}
                minLength={5}
                value={password}
                valueAgain={password as string}
                onChange={(isValid) => {
                  if (isValid === true)
                    setValid(true)
                }}
              />

            </div>
            {/* Confirm Password */}
            <div className="p-3 w-full md:w-1/2">
              <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                placeholder="••••••••"
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="password"
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mt-4">
            <div className="w-full px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  handleSignUp();
                }}
              >
                SIGN UP
              </button>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Already have an account? SIGN IN
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
};

export default SignUp;