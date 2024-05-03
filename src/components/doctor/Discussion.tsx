import React, { useState, useEffect } from "react";
import axios from "../../assets/axiosConfig";
import moment from 'moment';
import { useLocation } from 'react-router-dom';

const Discussion = ({ patientId }) => {
//   const location = useLocation();
//   const { patientId } = location.state;

  const [messageList, setMessageList] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [patient, setPatient] = useState({});
  const [newMessageContent, setNewMessageContent] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [activePolling, setActivePolling] = useState(null);

  const handleJoinConversation = async (patientId) => {
    console.log("Join conversation with patient ID:", patientId);
   

    try {
      const { data } = await axios.get(`http://localhost:3000/api/messages/messageD/${patientId}`);
      setMessageList(data.messages);
      setDoctor(data.doctor);
      setPatient(data.patient);
      setShowInput(true);

    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
      handleJoinConversation(patientId);
    }, [])


  const sendMessage = async () => {
    if (!newMessageContent.trim()) return; 

    try {
      const response = await axios.post('http://localhost:3000/api/messages/messagedoctor/send', {
        content: newMessageContent,
        fromDoctorId: doctor.id, 
        toPatientId: patient.id,
      });
      setMessageList(prevMessages => [...prevMessages, response.data]); 
      setNewMessageContent(''); 
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="chatBox float-right w-1/2 p-4 border border-[#AAD9BB] rounded-lg">
      {/* Chat box for displaying messages */}
      {messageList.map((msg, i) => (
        <div key={i} className="flex mb-2.5 justify-start" style={{ justifyContent: msg.fromDoctorId !== null ? "flex-end" : "flex-start" }}>
          <div className={`flex ${msg.fromDoctorId !== null ? "flex-row-reverse" : "flex-row"} items-center max-w-full`}>
            <img src={msg.fromDoctorId !== null ? doctor.profile_picture : patient.profile_picture}
              alt={msg.fromDoctorId !== null ? doctor.fullName : patient.fullName}
              className="w-10 h-10 rounded-full mx-2.5" />
            <div className={`bg-${msg.fromDoctorId !== null ? "blue-200" : "gray-100"} p-2 rounded-md break-words`}>
              <p className="m-0">{msg.content}</p>
              <p>{moment(msg.createdAt).format('DD/MM HH:mm')}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Input box for sending new messages */}
      {showInput && (
        <div>
          <input className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            placeholder="Type your message..."
          />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={sendMessage}>
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default Discussion;
