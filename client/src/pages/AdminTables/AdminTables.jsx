import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import { useNavigate, useLocation } from "react-router-dom";
export default function AdminTables() {
  const [data, setData] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [selectUser, setSelectUser] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    axios
      .get("http://insflurance-api-php.test/api/tip/register")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleGetUser = async (e) => {
    e.preventDefault();
    setSelectUser(e.target.value);
    if (selectUser !== null) {
      navigate("/edit", { state: { selectUser } });
    }
    console.log(e.target.value);
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    setSelectUser(e.target.value);
    if (selectUser) {
      axios
        .delete(
          `http://insflurance-api-php.test/api/tip/register/${selectUser}`
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (isLoading) {
    return null;
  }
  return (
    <>
      <Nav />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Application Number</TableCell>
              <TableCell align="right">Prefix</TableCell>
              <TableCell align="right">Firstname</TableCell>
              <TableCell align="right">Lastname</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">Region</TableCell>
              <TableCell align="right">Postal Code</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  create
                </button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.application_number}
                </TableCell>
                <TableCell align="right">{item.prefix}</TableCell>
                <TableCell align="right">{item.firstname}</TableCell>
                <TableCell align="right">{item.lastname}</TableCell>
                <TableCell align="right">{item.email}</TableCell>
                <TableCell align="right">{item.username}</TableCell>
                <TableCell align="right">{item.password}</TableCell>
                <TableCell align="right">{item.address}</TableCell>
                <TableCell align="right">{item.city}</TableCell>
                <TableCell align="right">{item.spr}</TableCell>
                <TableCell align="right">{item.postal_code}</TableCell>
                <TableCell align="right">{item.country}</TableCell>
                <TableCell align="right">{item.phone_number}</TableCell>
                <TableCell align="right">
                  <button onClick={handleGetUser} value={item.id}>
                    edit
                  </button>
                  <button onClick={handleDeleteUser} value={item.id}>
                    delete
                  </button>
                </TableCell>
                {/* <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
