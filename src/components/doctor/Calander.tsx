import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../../assets/axiosConfig";
import "./customCalendar.css"

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
interface AppointmentDataUpdate extends Partial<Appointment> {
  appointmentTime?: string;

}
interface Appointment {
  id: number;
  dateTime: string;
  PatientName: string;
  description: string;
  createdAt: string;
  doctorId: number;
}
const Calender = () => {
  const [doctor, setDoctor] = useState<Doctor>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentData, setAppointmentData] = useState<AppointmentDataUpdate>(
    {
      doctorId: 0,
      PatientName: "",
      dateTime: "",
      description: "",
    }
  );
  let token = localStorage.getItem("token");
  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/doctors/getDoctor",
        { headers: { token: token } }
      );
      setDoctor(response.data)
      const { data } = await axios.get(
        `http://localhost:3000/api/appointment/getAppointements/${response.data?.id}`,
        { headers: { token: token } }
        
      );
      console.log(response.data);
      setAppointments(data);
      console.log(data);
      
      
    } catch (error) {
      console.error("Error fetching appointments:", error);

    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setAppointmentData({ ...appointmentData, dateTime: date.toISOString() });
  };



  const filteredAppointments = appointments.filter(
    (appointment) =>
      new Date(appointment.dateTime).getFullYear() ===
        selectedDate.getFullYear() &&
      new Date(appointment.dateTime).getMonth() === selectedDate.getMonth() &&
      new Date(appointment.dateTime).getDate() === selectedDate.getDate()
  );

  
  useEffect(() => {
   getAppointments();
   
  }, [showModal]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = { ...appointmentData, doctorId: doctor?.id };
    console.log(data);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/appointment/addAppointement/${doctor?.id}`,
        data,
        { headers: { "token": token } }
      );


      getAppointments();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAppointmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (

    <div className="container px-4 py-8 ">
      <h2 className="text-3xl font-bold mb-4 text-blue-800"  style={{ textAlign: 'center' }}>
              Appointment Calendar
            </h2>
            <div className="">
        <div className="flex items-center">
          <div className="flex  items-center shadow-2xl bg-white bg-opacity-6 rounded-lg p-4 max-w-3xl mb-8">
            
            <div className="">
              <Calendar onChange={handleDateChange} value={selectedDate} />
            </div>
          </div>

          <div className="appointments-wrapper ml-4 shadow-2xl bg-white bg-opacity-6 rounded-lg p-4 max-w-5xl mb-8 ">
            <h3 className="text-lg font-semibold mb-2 text-blue-700">
              Appointments for {selectedDate.toDateString()}
            </h3>
           
            {filteredAppointments.length > 0 ? (
              <ul>
                {filteredAppointments.map((appointment, index) => (
                  <li
                    key={index}
                    className="py-2 text-blue-900 border-l-4 border-blue-500 pl-2 mb-2 rounded-md"
                  >
                    <h1 className="font-bold text-red-600">
                      {new Date(appointment.dateTime).toLocaleTimeString()}
                    </h1>{" "}
                    -{" "}
                    <span className="text-blue-700">
                      {appointment.PatientName}
                    </span>{" "}
                    - {appointment.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600">No appointments for this date.</p>
            )}

           <button
              className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded mb-4 mt-9"
              onClick={() => setShowModal(true)}
            >
              Add Appointment
            </button>
          </div>
         
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label
                      htmlFor="patientName"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Patient Name
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={appointmentData.PatientName}
                      onChange={(e) =>
                        setAppointmentData({
                          ...appointmentData,
                          PatientName: e.target.value,
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={appointmentData.description}
                      onChange={(e) =>
                        setAppointmentData({
                          ...appointmentData,
                          description: e.target.value,
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="appointmentTime"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Appointment Time
                    </label>
                    <input
                      type="time"
                      id="appointmentTime"
                      name="appointmentTime"
                      defaultValue={appointmentData.dateTime}

                      onChange={(e) => {
                        handleInputChange(e);
                        const selectedTime = e.target.value;
                        const currentTime = selectedDate
                          .toISOString()
                          .slice(0, 10);

                        const dateTimeString = `${currentTime}T${selectedTime}:00.000Z`;

                        setAppointmentData({
                          ...appointmentData,
                          dateTime: dateTimeString,
                        });
                      }}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#A3FFD6] text-base font-medium text-white hover:bg-[#4be39f] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calender;
