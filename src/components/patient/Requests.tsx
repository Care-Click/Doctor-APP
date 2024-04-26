import axios from "axios";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    textAlign: 'right', // Centers the text in the header cells
    padding: theme.spacing(1, 2), // Adjusts the padding; feel free to change the values
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'right', // Centers the text in the body cells
    padding: theme.spacing(1, 2), // Adjusts the padding
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // "&:nth-of-type(odd)": {
  //   backgroundColor: theme.palette.action.hover,
  // },
}));

function Requests() {
  const navigate = useNavigate();
  const [doctorId, setDoctorId] = React.useState(0);
  const [reqs, setData] = React.useState([]);

  const getRequests = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/requests/requests/${token}`
      );
      setData(data.reversed);
      setDoctorId(data.doctorId);
      console.log(reqs);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptRequest = async (reqId) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(
        `http://localhost:3001/api/requests/accepteRequest/${reqId}/${token}`
      );
      getRequests();
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getRequests();
  }, []);

  return (
    <TableContainer component={Paper}  sx={{ mx: 'auto',  my: 5, boxShadow: 2, maxWidth: 1200, }}>
      <Table aria-label="customized table">
        <TableHead style={{ backgroundColor: "#00a09d", color: "#FFFFFF" }}>
          <TableRow  >
            <StyledTableCell style={{fontSize: "17px"}}>Name</StyledTableCell>
            <StyledTableCell style={{fontSize: "17px"}}>Phone Number</StyledTableCell>
            <StyledTableCell style={{fontSize: "17px"}} align ='center'>Description</StyledTableCell>
            <StyledTableCell style={{fontSize: "17px"}}>Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reqs.map((req) => (
            <StyledTableRow key={req.name}  className="  hover:bg-gray-300 ">
               {/* <img src={req.Patient.profile_picture} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} /> */}
              <StyledTableCell className="text-lg">{req.Patient.FullName}</StyledTableCell>
              <StyledTableCell className="text-lg">{req.Patient.phone_number}</StyledTableCell>
              <StyledTableCell className="text-lg">{req.message}</StyledTableCell>
              <StyledTableCell className="text-lg">
                {req.status === "Pending" ? (
                  <button onClick={() => acceptRequest(req.id)} className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300">Accept</button>
                ) : req.doctorId === doctorId ? (
                  <button className="text-[#F26268] text-lg hover:bg-[#1DBED3] hover:[#1DBED3] px-2 tablet:px-3 py-1 rounded transition-colors duration-300" onClick={() => { navigate("/report",{state:{patientId:req.id}}) }}>Report</button>

                ) : (
                  <p className="text-[#1DBED3] text-lg">Already Accepted</p>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Requests;
