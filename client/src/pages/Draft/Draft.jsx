import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { isLoggedIn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
import axios from "axios";
import { useLocation } from "react-router-dom";
const theme = createTheme();

export default function Draft() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [aData, setaData] = React.useState();
  const location = useLocation();
  const agent = localStorage.getItem("user");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (authenticated) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("aid");
      axios
        .post(`http://localhost:8085/getdraft`, { aid: user })
        .then((res) => {
          setaData(res.data);
          console.log(res.data);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [authenticated]);
  if (!authenticated) {
    setAuthenticated(isLoggedIn());
  }
  if (loading) {
    return null;
  }
  return (
    <>
      <Nav />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {agent}'s draft list
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              ></Stack>
            </Container>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell align="right">Customer's Firstname</TableCell>
                  <TableCell align="right">Customer's Lastname</TableCell>
                  <TableCell align="right">Customer's Email</TableCell>
                  <TableCell align="right">Customer's Citizen Id</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {aData.map((row, index) => (
                  <TableRow key={index + 1}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{row.firstname}</TableCell>
                    <TableCell align="right">{row.lastname}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.citizen_id}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#6f69dc" }}
                        onClick={() => navigate("/draftbuy", { state: row.id })}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </main>
      </ThemeProvider>
      {/* Footer */}
      <Footer />
    </>
  );
}
