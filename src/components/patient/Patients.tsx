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
 let token = localStorage.getItem("token")
 console.log(token)

  
  const navigate = useNavigate()
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Patient[]>(`http://localhost:3000/api/doctors/${token}/patients`);
        setPatients(response.data);
        console.log(patients);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(patients);

  }, []);

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: 'auto', mt: 4 }}>
    <Table aria-label="customized table">
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
          <StyledTableRow key={patient.id} onClick={() => navigate('/report',{state:{patientId:patient.id}})}  className="border-blue-700 hover:bg-blue-300 cursor-pointer">
            <StyledTableCell component="th" scope="row">
              <img src={patient.profile_picture} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} />
            </StyledTableCell>
            <StyledTableCell>{patient.FullName}</StyledTableCell>
            <StyledTableCell>{patient.email}</StyledTableCell>
            <StyledTableCell>{patient.phone_number}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}

export default Patients;
