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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
function Requests() {
 const navigate =useNavigate()
  const [doctorId, setdoctorId] = React.useState(0);
  const [data, setdata] = React.useState([]);
  const getRequests = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/requests/requests/${token}`
      );
      setdata(data.reversed);
      setdoctorId(data.doctorId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const AcepteRequest = async (reqId) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/requests/accepteRequest/${reqId}/${token}`
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
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{ backgroundColor: "#1DBED3", color: "#FFFFFF" }}>
          <TableRow className="container mx-auto px-4 flex justify-between">
            <StyledTableCell
              align="right"
              style={{
                backgroundColor: "#1DBED3",
                color: "#FFFFFF",
                fontSize: "21px",
              }}
            >
              Name
            </StyledTableCell>
            <StyledTableCell
              align="right"
              style={{
                backgroundColor: "#1DBED3",
                color: "#FFFFFF",
                fontSize: "21px",
              }}
            >
              phone number
            </StyledTableCell>
            <StyledTableCell
              style={{
                backgroundColor: "#1DBED3",
                color: "#FFFFFF",
                fontSize: "21px",
              }}
            >
              Description
            </StyledTableCell>
            <StyledTableCell
              style={{
                backgroundColor: "#1DBED3",
                color: "#FFFFFF",
                fontSize: "21px",
              }}
            >
              status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((req: any) => (
            <StyledTableRow key={req.name}>
              <StyledTableCell component="th" scope="row">
                {req.name}
              </StyledTableCell>
              <StyledTableCell  className="text-lg ">{req.Patient.FullName}</StyledTableCell>
              <StyledTableCell  className="text-lg ">{req.Patient.phone_number}</StyledTableCell>
              <StyledTableCell  className="text-lg ">{req.message}</StyledTableCell>
              <StyledTableCell  className="text-lg ">
                {req.status === "Pending" ? (
                  <button onClick={() => AcepteRequest(req.id)} className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300">accept</button>
                ) : req.doctorId === doctorId ? (
                  <button className="text-[#F26268] text-lg hover:bg-[#1DBED3] hover:[#1DBED3] px-2 tablet:px-3 py-1 rounded transition-colors duration-300" onClick={()=>{ navigate("/report")}}>repport</button>
                ) : (
                  <p className="text-[#1DBED3] text-lg  ">Already Accepted</p>
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
