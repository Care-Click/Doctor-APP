import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: number;
  profile_picture: string;
  FullName: string;
  email: string;
  phone_number: string;
}

const Patients = () => {

  const navigate = useNavigate()
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Patient[]>('http://localhost:3000/api/doctors/12/patients');
        setPatients(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(patients);

  }, []);

  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Profile Picture</th>
            <th className="p-2">Full name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} className="border border-gray-500 hover:bg-blue-300 cursor-pointer"
              onClick={() => navigate('/report')}
            >
              <td className="p-2">
                <img src={patient.profile_picture} alt="Profile" className="w-12 h-12 rounded-full" />
              </td>
              <td className="p-2">{patient.FullName}</td>
              <td className="p-2">{patient.email}</td>
              <td className="p-2">{patient.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
