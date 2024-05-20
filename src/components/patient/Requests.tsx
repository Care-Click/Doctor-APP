import axios from "axios";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
interface Request {
  id: number;
  Patient: {
    profile_picture: string;
    FullName: string;
    phone_number: string;
  };
  message: string;
  status: 'Pending' | 'Completed';
  doctorId: number;
  patientId: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    fontSize:18 ,
    textAlign: "left", 
    padding: theme.spacing(1, 2), 
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    textAlign: "left", 
    padding: theme.spacing(1, 2), 
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function Requests() {
  const navigate = useNavigate();
  const [acceptPopUp,setacceptPopUp] =useState(false)
  const [doctorId, setDoctorId] = useState(0);
  const [reqs, setData] = useState([]);
  const [test, setTest] = useState(false);
  const [req, setreq] = useState();

  const getRequests = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/requests/requests`,{headers:{"token":token}}
      );
      setData(data.reversed);
      setDoctorId(data.doctorId);

    } catch (error) {
      console.log(error);
    }
  };

  const acceptRequest = async (reqId) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/requests/accepteRequest/${reqId} `,{headers:{"token":token}}
      );
      console.log(data);
      setTest(!test);
      setacceptPopUp(false)
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getRequests();
  }, [test]);

  return (
    <div className="bg-gray-300 h-full bg-cover bg-opacity-45 pt-24 p-5">
    <TableContainer
      component={Paper}
      sx={{ mx: "auto", my: 5, boxShadow: 2, maxWidth: 1300 }}
     >
      <Table aria-label="customized table">
        <TableHead style={{ backgroundColor: "#00a09d", color: "#FFFFFF" }}>
          <TableRow>
            <StyledTableCell >profile picture</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >
              Phone Number
            </StyledTableCell>
            <StyledTableCell  align="center">
              Description
            </StyledTableCell>
            <StyledTableCell>
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reqs.map((req:Request) => (
            <StyledTableRow key={req.id} className="  hover:bg-gray-300 ">
             <StyledTableCell>
              <img
                src={req?.Patient?.profile_picture}
                alt="Profile"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              /></StyledTableCell>
              <StyledTableCell className="text-lg">
                {req?.Patient?.FullName}
              </StyledTableCell>
              <StyledTableCell className="text-lg">
                {req?.Patient?.phone_number}
              </StyledTableCell>
              <StyledTableCell className="text-lg">
                {req.message}
              </StyledTableCell>
              <StyledTableCell className="text-lg">
                {req.status === "Pending" ? (
                  <button
                    onClick={() => { setreq(req)
                      setacceptPopUp(!acceptPopUp)} }
                    className="text-[#1DBED3] text-lg hover:bg-[#F26268] hover:text-white px-2 tablet:px-3 py-1 rounded transition-colors duration-300"
                  >
                    Accept
                  </button>
                ) : req.doctorId === doctorId ? (
                  <button
                    className="text-[#F26268] text-lg hover:bg-[#1DBED3] hover:[#1DBED3] px-2 tablet:px-3 py-1 rounded transition-colors duration-300"
                    onClick={() => {console.log(req);
                    
                      navigate("/report", { state: { patientId: req.patientId } });
                    }}
                  >
                    Report
                  </button>
                ) : (
                  <p className="text-[#1DBED3] text-lg">Already Accepted</p>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    {acceptPopUp && (
  <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-sm">
        {/* Content */}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Confirmation Required
            </h3>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              Are you sure you want to accept this request?
            </p>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setacceptPopUp(!acceptPopUp)}
            >
              Close
            </button>
            <button
              
              onClick={()=> acceptRequest(req.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Accept Now
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
   </>)}
    </div>
  );
}

export default Requests;
