import * as React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import style from "./Checkout.module.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const theme = createTheme();

export default function Checkout() {
  const [userType, setUserType] = React.useState("");
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setSelectedEndDate(dayjs(date).add(1, "year"));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  // const formData = { username: "jordan" };

  const handleAddressChange = (e, index) => {
    const updatedAddress = address.split(" ");
    updatedAddress[index] = e.target.value;
    setAddress(updatedAddress.join(" "));
  };
  const [formData, setFormData] = React.useState({
    appNumber: null,
    prefix: null,
    firstName: null,
    lastName: null,
    email: null,
    username: null,
    password: null,
    address: null,
    city: null,
    spr: null,
    postalCode: null,
    country: null,
    phoneNumber: null,
    enddate: null,
  });
  const testApi = (e) => {
    e.preventDefault();
    axios
      .post("http://insflurance-api-php.test/api/tip/register", {
        application_number: formData.appNumber,
        prefix: formData.prefix,
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone_number: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        state_province_region: formData.spr,
        postal_code: formData.postal,
        country: formData.country,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const sendEmailToUser = (e) => {
  //     e.preventDefault();
  //     axios
  //       .get(`http://insflurance-api-php.test/api/test-email`, {
  //         email: formData.email,
  //         username: formData.username,
  //         password: formData.password,
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  const handleChange = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  React.useEffect(() => {}, []);
  return (
    <div className={style.wrapper}>
      <Nav />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p className={"primaryText"}>Purchase</p>
              <div className={style.textSeparator}></div>
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {/* <Grid item xs={12}>
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                autoFocus
                label="User Type"
                onChange={handleUser}
                // onChange={handleChange}
                >
                  <MenuItem value={"customer"}>Customer</MenuItem>
                  <MenuItem value={"agent"}>Agent</MenuItem>
                  <MenuItem value={"representative"}>Representative</MenuItem>
                  </Select>
                </Grid> */}

                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">
                    Select Package
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    name="prefix"
                    label="Prefix"
                    onChange={handleChange}
                    defaultValue="package1"
                  >
                    <MenuItem value={"package1"}>Starter Pack</MenuItem>
                    <MenuItem value={"package1"}>Basic Pack</MenuItem>
                    <MenuItem value={"package1"}>Pro Pack</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="appNumber"
                    label="Application Number"
                    name="appNumber"
                    autoComplete="appNumber"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    name="prefix"
                    label="Prefix"
                    onChange={handleChange}
                    defaultValue="Mr."
                  >
                    <MenuItem value={"Mr."}>Mr.</MenuItem>
                    <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                    <MenuItem value={"Miss"}>Miss</MenuItem>
                    <MenuItem value={"Ms."}>Ms.</MenuItem>
                    <MenuItem value={"Dr."}>Dr.</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    onChange={handleChange}
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="citizen"
                    label="Citizen Id"
                    name="citizen"
                    onChange={handleChange}
                    autoComplete="citizen"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Birthdate"
                      inputFormat="MM/DD/YYYY"
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Startdate"
                      inputFormat="MM/DD/YYYY"
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Enddate"
                      inputFormat="MM/DD/YYYY"
                      value={selectedEndDate}
                      disabled
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                    onChange={handleChange}
                    autoComplete="price"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="city"
                    name="city"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="spr"
                    label="State / Province / Region"
                    name="spr"
                    autoComplete="spr"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="postalCode"
                    name="postal"
                    required
                    fullWidth
                    id="postal"
                    label="Zip / Postal code"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    autoComplete="country"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phone"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I agree to Influrance's terms and conditions."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                // type="button"
                fullWidth
                variant="contained"
                // onClick={testApi}
                // onClick={sendEmailToUser}
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#FFDA88", color: "#252525" }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ textDecoration: "none", color: "#6f69dc" }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </div>
  );
}
