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
import style from "./Register.module.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function Register() {
  const [userType, setUserType] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const location = useLocation();
  const navigate = useNavigate();
  const handleUser = (e) => {
    e.preventDefault();
    setUserType(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const [formData, setFormData] = React.useState({
    application_number: location.state.nextId,
    registration_date: dayjs(currentDate).toDate(),
    birthdate: null,
    prefix: null,
    firstname: null,
    lastname: null,
    citizen_id: null,
    email: null,
    username: null,
    password: null,
    address: null,
    district: null,
    sub_district: null,
    postal_code: null,
    province: null,
    phone_number: null,
    license_number: null,
    license_expire_date: null,
    role: null,
  });
  const testApi = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8085/auth/register", {
        application_number: formData.application_number,
        registration_date: formData.registration_date,
        birthdate: formData.birthdate,
        prefix: formData.prefix,
        firstname: formData.firstname,
        lastname: formData.lastname,
        citizen_id: formData.citizen_id,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        address: formData.address,
        district: formData.district,
        sub_district: formData.sub_district,
        postal_code: formData.postal_code,
        province: formData.province,
        phone_number: formData.phone_number,
        license_number: formData.license_number,
        license_expire_date: formData.license_expire_date,
        role: formData.role,
      })
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          axios.post(`http://localhost:8085/sendMail`, {
            recipient: "jordanlaphon@gmail.com",
            msgBody: `Your login credentials \n Username: ${formData.username} \n Password: ${formData.password}`,
            subject: "Thank you for registering with Influrance!",
          });
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // const handleChange = (e) => {
  //   setFormData(() => ({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
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
              <p className={"primaryText"}>Registration</p>
              <div className={style.textSeparator}></div>
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="appNumber"
                    label="Application Number"
                    name="application_number"
                    value={location.state.nextId}
                    autoComplete="appNumber"
                    disabled
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Birthdate"
                      name="birthdate"
                      type="date"
                      onChange={(date) => {
                        const birthdateString = dayjs(date).toDate();
                        setFormData((prevState) => ({
                          ...prevState,
                          birthdate: birthdateString,
                        }));
                      }}
                      value={formData.birthdate}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                      fullWidth
                    />
                  </LocalizationProvider>
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
                    defaultValue={"Prefix"}
                  >
                    <MenuItem value={"Prefix"} disabled>
                      Prefix
                    </MenuItem>
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
                    name="firstname"
                    required
                    fullWidth
                    id="firstname"
                    onChange={handleChange}
                    label="First Name"
                  />
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Lastname"
                    name="lastname"
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    name="role"
                    label="Select Role"
                    onChange={handleChange}
                    defaultValue={"Role"}
                  >
                    <MenuItem value={"Role"} disabled>
                      Role
                    </MenuItem>
                    <MenuItem value={"A"}>Agent</MenuItem>
                    <MenuItem value={"B"}>Representative</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="citizen_id"
                    label="Citizen ID"
                    name="citizen_id"
                    onChange={handleChange}
                    autoComplete="email"
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
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    onChange={handleChange}
                    autoComplete="username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={handleChange}
                    autoComplete="new-password"
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
                    autoComplete="district"
                    name="district"
                    required
                    fullWidth
                    id="district"
                    label="District"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="subDistrict"
                    label="Sub District"
                    name="sub_district"
                    autoComplete="sub_district"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="postalCode"
                    label="Postal Code"
                    name="postal_code"
                    autoComplete="postal_code"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="province"
                    name="province"
                    required
                    fullWidth
                    id="province"
                    label="Province"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phone_number"
                    autoComplete="phone"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="licenseNumber"
                    label="License Number"
                    name="license_number"
                    autoComplete="license_number"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="License Expire Date"
                      name="license_expire_date"
                      type="date"
                      required
                      onChange={(date) => {
                        const licenseDateString = dayjs(date).toDate();
                        setFormData((prevState) => ({
                          ...prevState,
                          license_expire_date: licenseDateString,
                        }));
                      }}
                      value={formData.license_expire_date}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                      fullWidth
                    />
                  </LocalizationProvider>
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
                onClick={testApi}
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
