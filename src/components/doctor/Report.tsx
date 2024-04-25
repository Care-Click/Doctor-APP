import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Country } from 'react-phone-number-input/core';
import { useLocation } from 'react-router-dom';
interface Patient {
    id: number | null;
    profile_picture: string;
    FullName: string;
    email: string;
    phone_number: string;
    Gender:string;
    date_of_birth:string;
    medicalInfo: Medinfo | {};
  }
  interface Medinfo {
    id: number;
    Imaging_test_results: string[];
    Chronic_Illness: string[];
    Medications: string[];
    Surgeries: string[];
    PastIllness: string[];
    Allergies : string[];
    Familial_Medical_History : string[];
  }
const Report = () => {
    const loca = useLocation();
    const {patientId} = loca.state;
    console.log(patientId);
    const [patient, setPatient] = useState({
        id: null,
        profile_picture: "",
        FullName: "",
        email: "",
        phone_number: "",
        medicalInfo: {
            Familial_Medical_History:[] ,Allergies:[],Surgeries:[],PastIllness:[],Imaging_test_results:[],Chronic_Illness:[],Medications: [],id:null
        },
        date_of_birth:"",
        Gender:""
      });
    const [location, setLocation] = useState({city:"",district:"",country:""});
    const [test, settest] = useState(true);
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setdesc] = useState('');
    const getPatient=async ()=>{
     try {
      const {data } = await axios.get( `http://localhost:3000/api/doctors/patient/${patientId}`)
        setLocation(JSON.parse(data.location))
        setPatient(data)
        settest(false)
      } catch (error) {
      console.log(error);
      }
    }
    const sendReport=async ()=>{
      try {
         const response = await axios.post( `http://localhost:3000/api/requests/createRepport/${requestId}`)
         
        
        
       } catch (error) {
       console.log(error);
       }
     }
useEffect(()=>{
    getPatient()
},[test])
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleInputChange = (e) => {
        setdesc(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected option:', selectedOption);
        console.log('Input value:', description);
    };

    if (test){
        return <div>loading</div>
    }
    else{
    return (
        <div className="container mx-auto mt-8">
             <div className="flex justify-center items-center mb-8 border border-grey-900 rounded-md p-4 bg-gray-300">
               
               <div className="w-1/2 mr-4 border-r border-gray-300 pr-4">
                    <h2 className="text-lg font-bold mb-4">Medical Information</h2>
                    <div className="flex items-center justify-between mb-8">
    <div className="flex items-center">
          <img src={patient.profile_picture} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
          <div>
            <h1 className="text-3xl font-bold">{patient?.FullName}</h1>
            <p className="text-gray-600">{patient?.email}</p>
            <p className="text-gray-600">{patient?.phone_number}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{patient?.Gender}</h2>
          <p className="text-gray-600">Date of Birth: {new Date(patient?.date_of_birth).toLocaleDateString()}</p>
          <p className="text-gray-600">Location: {location.city}, {location.district}, {location.country}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Medical Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold">Familial Medical History</h3>
            <ul>
              {patient.medicalInfo.Familial_Medical_History.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
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
          <div>
            <h3 className="text-xl font-semibold">Imaging Test Results</h3>
            <ul>
              {patient.medicalInfo.Imaging_test_results.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
                </div>  
                {/* Dropdown and input form */}
                <div className="w-1/2 ml-4">
                    <h2 className="text-lg font-bold mb-4">Add Information</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Dropdown select */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="dropdown">
                                Select an Information:
                            </label>
                            <select
                                id="dropdown"
                                className="block w-full border border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 bg-white"
                                value={selectedOption}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select an Info...</option>
                                <option value="Familial_Medical_History">Familial Medical History</option>
                                <option value="Allergies">Allergies</option>
                                <option value="PastIllness ">PastIllness </option>
                                <option value="Surgeries  ">Surgeries </option>
                                <option value="Medications  ">Medications  </option>
                                <option value="Chronic_Illness ">Chronic_Illness </option>
                                <option value="Imaging_test_results ">Imaging_test_results </option>
                            </select>
                        </div>
                        {/* Input field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="inputField">
                                Description:
                            </label>
                            <input
                                id="inputField"
                                type="text"
                                className="block w-full border border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 bg-white"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Submit button */}
                        <div>
                            <button
                                className="bg-[rgba(242,98,104,0.75)] text-white py-2 px-4 tablet:px-3 rounded hover:bg-[#F26268] flex items-center w-15 ml-50 "
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );}
};

export default Report;

