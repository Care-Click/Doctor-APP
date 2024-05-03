import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Discussion from '../doctor/Discussion';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {

    color: theme.palette.common.white,
    padding: theme.spacing(1, 2)
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hover styles
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  }
}));


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
  const [test, setTest] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token=localStorage.getItem("token")
      console.log(token);
      
      try {
        const response = await axios.get<Patient[]>(`http://localhost:3000/api/doctors/patients`,{headers:{"token":token}});
        setPatients(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setTest(!test)
  }, []);

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', maxWidth: 1200 }}>
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table aria-label="customized table mb-9">
        <TableHead style={{ backgroundColor: '#0053a0', color: "#FFFFFF" }}>
          <TableRow>
            <StyledTableCell>Profile Picture</StyledTableCell>
            <StyledTableCell>Full Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Phone Number</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <StyledTableRow key={patient.id} className="border-blue-700 hover:bg-blue-300 cursor-pointer">
              <StyledTableCell component="th" scope="row" >
                <img src={patient.profile_picture} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} />
              </StyledTableCell>
              <StyledTableCell >{patient.FullName}</StyledTableCell>
              <StyledTableCell>{patient.email}</StyledTableCell>
              <StyledTableCell onClick={() => setSelectedPatientId(patient.id)}>{patient.phone_number} 💬</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <div className="chat-box flex mb-2.5  " style={{
  position: 'fixed', 
  bottom: 0,          
  right: 0,           
  width: '750px',     
  height: '400px',     
  overflow: 'auto' ,  
}}>
     {selectedPatientId && <Discussion patientId={selectedPatientId} />}
     </div>
     </div>
  );
}

export default Patients;
