import React, { useState, useEffect } from 'react';
import axios from '../../assets/axiosConfig.js'
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 20,
    color: theme.palette.common.white,
    padding: theme.spacing(1, 2)
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 19,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // // hover styles
  // '&:hover': {
  //   backgroundColor: theme.palette.action.selected,
  // }
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

  useEffect(() => {
    const fetchData = async () => {
      const token=localStorage.getItem("token")
      
      
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
    <div className='p-32 pt-36 h-screen bg-gray-100'>
    <div className="shadow-2xl rounded-lg max-auto ">
    <TableContainer component={Paper}>
      <Table aria-label="customized table mb-9">
        <TableHead style={{ backgroundColor: '#0053a0', color: "#FFFFFF" }}>
          <TableRow>
            <StyledTableCell>Profile Picture</StyledTableCell>
            <StyledTableCell>Full Name</StyledTableCell>
            <StyledTableCell>Age</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell>Phone Number</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient) => (
            <StyledTableRow key={patient.id} className="border-blue-700 bg-gray-100 hover:bg-blue-300 cursor-pointer" onClick={()=>navigate("/report", { state: { patientId: patient.id } })}>
              <StyledTableCell component="th" scope="row"  >
                <img src={patient.profile_picture} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} />
              </StyledTableCell>
              <StyledTableCell >{patient.FullName}</StyledTableCell>
              <StyledTableCell >{moment().diff(patient.date_of_birth,'years')}</StyledTableCell>
              <StyledTableCell>{patient.email}</StyledTableCell>
            <StyledTableCell>{patient.phone_number.slice(4)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
     </div>
  );
}

export default Patients;
