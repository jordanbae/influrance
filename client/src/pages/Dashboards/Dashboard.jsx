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
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
import axios from "axios";
const theme = createTheme();

export default function Dashboard() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [pData, setpData] = React.useState();
  React.useEffect(() => {
    if (authenticated) {
      const token = localStorage.getItem("token");
      axios
        .post(`http://influrance-api.test/api/v1/uorder`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setpData(res.data.customerOrders);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(pData);
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
                Welcome
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
                  <TableCell align="left">Start Date</TableCell>
                  <TableCell align="left">End Date</TableCell>
                  <TableCell align="right">Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Coverage Allowance</TableCell>
                  <TableCell align="right">Coverage Claimed</TableCell>
                  <TableCell align="right">Coverage Left</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Firstname</TableCell>
                  <TableCell align="right">Lastname</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.start_date}
                    </TableCell>
                    <TableCell align="left">{row.end_date}</TableCell>
                    <TableCell align="right">{row.product_name}</TableCell>
                    <TableCell align="right">{row.product_price}</TableCell>
                    <TableCell align="right">
                      {row.coverage_allowance}
                    </TableCell>
                    <TableCell align="right">
                      {row.coverage_claimed + 0}{" "}
                    </TableCell>
                    <TableCell align="right">
                      {row.coverage_left + row.product_price}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">
                      {row.prefix + row.firstname}
                    </TableCell>
                    <TableCell align="right">{row.lastname}</TableCell>
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
