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
  const [request, setRequest] = React.useState([]);

  const [data, setdata] = React.useState([]);
  const getRequests = async () => {
    try {
      const {data } = await axios.get(
        "http://localhost:3000/api/doctors/requests"
      );
      setdata(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const AcepteRequest = async (id) => {
    const token=localStorage.getItem('token')
    
    try {
      const {data} = await axios.get(
        `http://localhost:3000/api/requests/accepteRequest/${id}/${token}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getRequests();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead style={{ backgroundColor: "#1DBED3", color: "#FFFFFF" }}>
          <TableRow style={{ backgroundColor: "#1DBED3", color: "#FFFFFF" }}>
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
              align=""
            >
              status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((req) => (
            <StyledTableRow key={req.name}>
              <StyledTableCell component="th" scope="req">
                {req.name}
              </StyledTableCell>
              <StyledTableCell>{req.Patient.FullName}</StyledTableCell>
              <StyledTableCell>{req.Patient.phone_number}</StyledTableCell>
              <StyledTableCell>{req.message}</StyledTableCell>
              <StyledTableCell>
                {req.status === "Pending" ? (
                  <button onClick={()=>{
                    AcepteRequest(req.id)
                  }}>accept</button>
                ) : (
                  <>Already Acepted</>
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
