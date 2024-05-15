import axios from "../../assets/axiosConfig";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Country } from "react-phone-number-input/core";
import { useLocation } from "react-router-dom";

interface Patient {
  id: number | null;
  profile_picture: string;
  FullName: string;
  email: string;
  phone_number: string;
  Gender: string;
  date_of_birth: string;
  medicalInfo: Medinfo;
}

interface Medinfo {
  id: null | number;
  Imaging_test_results: string[];
  Chronic_Illness: string[];
  Medications: string[];
  Surgeries: string[];
  PastIllness: string[];
  Allergies: string[];
  Familial_Medical_History: string[];
}

const Report = () => {
  const { register, handleSubmit } = useForm(); 
  const loca = useLocation();
  const { patientId } = loca.state;
  const [info,setInfo] =useState (false)


  const [patient, setPatient] = useState<Patient>({
    id: null,
    profile_picture: "",
    FullName: "",
    email: "",
    phone_number: "",
    medicalInfo: {
      Familial_Medical_History: [],
      Allergies: [],
      Surgeries: [],
      PastIllness: [],
      Imaging_test_results: [],
      Chronic_Illness: [],
      Medications: [],
      id: null,
    },
    date_of_birth: "",
    Gender: "",
  });

  const [location, setLocation] = useState({city:"",district:"",country:""});

  const [test, settest] = useState(true);

  const getPatient = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/doctors/patient/${patientId}`
      );
      setLocation(JSON.parse(data.location).place)
  
      setPatient(data); 
      
      settest(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatient();
  }, [test]);

  const onSubmit = async (data) => {
    let newreport = {
      Familial_Medical_History: [],
      Allergies: [],
      Surgeries: [],
      PastIllness: [],
      Imaging_test_results: [],
      Chronic_Illness: [],
      Medications: [],
    };
    newreport[data.selectedOption] = [data.description]; // Access selectedOption and description from form data

    try {
      const { status } = await axios.post(
        `http://localhost:3000/api/requests/raport/${patientId}`,
        newreport
      );
      settest(!test);
      setInfo(false)
    } catch (error) {
      console.log(error);
    }
  };


  const showAddInfo = () => {
    setInfo(true);
  };


  return (
    <div className="overflow-hidden">
    <div style={{ backgroundImage: "url('/src/assets/images/report.png')" 
    }} className="flex  items-center p-9 bg-cover min-h-screen">
    <div className="p-2 ">
           {/* Personal Information Section */}
           <h1 className="text-3xl font-semibold mb-4"> Personal Informations:</h1>
        <div className="shadow-2xl bg-white bg-opacity-55 rounded-lg p-4 max-w-2xl mb-8">
      <div className="flex items-center gap-6 ">
        
          <img src={patient.profile_picture} alt="Profile" className="w-30 h-40 rounded-md " />
          <div>
            <h1 className="text-3xl font-bold mb-3">{patient?.FullName}</h1>
            <h3 className="text-l font-bold mb-1"> ⚥ {patient?.Gender}</h3>
            <p className="text-l font-bold mb-1"> 📞 {patient?.phone_number}</p>
            <p className="text-l font-bold mb-1"> 🌐 {patient?.email}</p>
            <p className="text-l font-bold mb-1"> 📅 {new Date(patient?.date_of_birth).toLocaleDateString()}</p>
            <p className="text-l font-bold mb-1"> 📍 {location.city}, {location.district}, {location.country}</p>
          </div>
        </div>
      
    </div>
    <h2 className="text-3xl font-semibold mb-4">Medical Information:</h2>
    <div className="flex justify-between  gap-9 w-full ">
      {/* Medical Information Section */}
      
      <div  className="bg-white bg-opacity-55  shadow-2xl  rounded-lg p-6 flex-row space-x-10" style={{ width: '600px' }}>
    
       
      <div  className="flex space-y-10">
      {patient.medicalInfo && (
        <div className=" grid grid-cols-2 gap-8 ">
               
                <div className="">
                  <h3 className="text-xl font-semibold">Allergies</h3>
                  <ul>
                    {patient.medicalInfo.Allergies.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Past Illnesses</h3>
                  <ul>
                    {patient.medicalInfo.PastIllness.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Surgeries</h3>
                  <ul>
                    {patient.medicalInfo.Surgeries.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Medications</h3>
                  <ul>
                    {patient.medicalInfo.Medications.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Chronic Illnesses</h3>
                  <ul>
                    {patient.medicalInfo.Chronic_Illness.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
              </div>
            )}
             
          </div>
          <div>.</div>
          <div style={{ textAlign: 'right'  }}>
          <button className="bg-[#F26268] text-white py-2 px-6 tablet:px-3 rounded flex-col " onClick={showAddInfo} > Add Information </button>
          </div>
        </div>

         {/* Add Information Section */}
         
         { info && <div className="bg-white bg-opacity-55 shadow-2xl rounded-lg  p-6 flex-grow " style={{ width: '600px' }}>
        <h2 className="text-lg font-bold mb-4">Add Information:</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
            {/* Dropdown select */}
            <div>
              <label
                className="block text-sm font-medium text-gray-900 mb-4"
                htmlFor="dropdown"
              >
                Select an Information:
              </label>
              <select
                id="dropdown"
                className="block w-full appearance-none border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 bg-white px-4 py-2 pr-8"
                {...register("selectedOption")} // Register selectedOption with useForm
              >
                <option value="">Select an Info...</option>
                <option value="Familial_Medical_History">
                  Familial Medical History
                </option>
                <option value="Allergies">Allergies</option>
                <option value="PastIllness">PastIllness </option>
                <option value="Surgeries">Surgeries </option>
                <option value="Medications">Medications </option>
                <option value="Chronic_Illness">Chronic_Illness </option>
                <option value="Imaging_test_results">
                  Imaging_test_results{" "}
                </option>
              </select>
            </div>
            {/* Input field */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-900 mb-2"
                htmlFor="inputField"
              >
                Description:
              </label>
              <textarea
                id="inputField"
                className="w-full p-9  rounded-md shadow-sm focus:border-blue-500 border border-gray-300"
                placeholder="Your message here..."
                {...register("description")} // Register description with useForm
              />
            </div>
            {/* Submit button */}
            <div style={{ textAlign: 'right'  }}>
              <button type="submit" className="bg-[#F26268] text-white py-2 px-4 tablet:px-3 rounded w-15 ">
                Save
              </button>
            </div>
          </form>
        </div>}
      </div>
      </div>
      </div>
      </div>
    
  );
};

export default Report;
