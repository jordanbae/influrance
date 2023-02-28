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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import style from "./Edit.module.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";

const theme = createTheme();

export default function Edit(props) {
  const [userType, setUserType] = React.useState("");
  const [isLoading, setLoading] = React.useState(true);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectUser, setSelectUser] = React.useState(null);
  const location = useLocation();
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
  // const formData = { username: "jordan" };

  const handleAddressChange = (e, index) => {
    const updatedAddress = address.split(" ");
    updatedAddress[index] = e.target.value;
    setAddress(updatedAddress.join(" "));
  };
  const updateUser = (e) => {
    e.preventDefault();
    console.log("Current select user", selectUser);
    axios
      .put(
        `http://insflurance-api-php.test/api/tip/register/${selectUser.id}`,
        {
          application_number: selectUser.appNumber,
          prefix: selectUser.prefix,
          firstname: selectUser.firstName,
          lastname: selectUser.lastName,
          email: selectUser.email,
          username: selectUser.username,
          password: selectUser.password,
          phone_number: selectUser.phoneNumber,
          address: selectUser.address,
          city: selectUser.city,
          state_province_region: selectUser.spr,
          postal_code: selectUser.postal,
          country: selectUser.country,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setSelectUser((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  };
  React.useEffect(() => {
    console.log("LOCATION STATE >>>>> ", location.state.selectUser);
    axios
      .get(
        `http://insflurance-api-php.test/api/tip/register/${location.state.selectUser}`
      )
      .then((res) => {
        console.log(res);
        setSelectUser(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return null;
  }
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
                  <TextField
                    fullWidth
                    autoFocus
                    id="appNumber"
                    label="Application Number"
                    name="appNumber"
                    autoComplete="appNumber"
                    defaultValue={selectUser.application_number}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Basic example"
                      value={currentDate}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
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
                    defaultValue={"hi"}
                    onChange={handleChange}
                  >
                    <MenuItem value={"Mr."}>Mr.</MenuItem>
                    <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                    <MenuItem value={"Miss"}>Miss</MenuItem>
                    <MenuItem value={"Ms."}>Ms.</MenuItem>
                    <MenuItem value={"Dr."}>Dr.</MenuItem>
                    <MenuItem value={selectUser.prefix} selected>
                      {selectUser.prefix}
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    defaultValue={selectUser.firstname}
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
                    defaultValue={selectUser.lastname}
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
                    defaultValue={selectUser.email}
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
                    defaultValue={selectUser.username}
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
                    defaultValue={selectUser.password}
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
                    defaultValue={selectUser.address}
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
                    defaultValue={selectUser.city}
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
                    defaultValue={selectUser.state_province_region}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="postalCode"
                    name="postal"
                    required
                    fullWidth
                    id="postalCode"
                    label="Zip / Postal code"
                    onChange={handleChange}
                    defaultValue={selectUser.postal_code}
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
                    defaultValue={selectUser.country}
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
                    defaultValue={selectUser.phone_number}
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
                onClick={updateUser}
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#FFDA88", color: "#252525" }}
              >
                Update
              </Button>
              <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ textDecoration: "none", color: "#6f69dc" }}
                  >
                    {/* Already have an account? Sign in */}
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
