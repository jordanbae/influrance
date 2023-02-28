import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import style from "./Checkout.module.scss";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { useLocation } from "react-router-dom";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode.react";
import Modal from "@mui/material/Modal";
import styled from "./Buy.module.scss";
import { isLoggedIn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 535,
  border: "10px solid #003D6B",
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: 0,
  p: 4,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const theme = createTheme();

export default function Buy() {
  const [userType, setUserType] = React.useState("");
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedEndDate] = React.useState(null);
  const [currentPackage, setCurrentPackage] = React.useState(null);
  const [numBeneficiaries, setNumBeneficiaries] = React.useState(1);
  const [phoneNumber, setPhoneNumber] = React.useState("080-020-0000");
  const [amount, setAmount] = React.useState(null);
  const [qrCode, setqrCode] = React.useState("sample");
  const [open, setOpen] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [checkAuthenticate, setCheckAuth] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const chosenPackage = location.state.package;
  React.useEffect(() => {}, [authenticated]);
  React.useEffect(() => {
    axios
      .get(`http://influrance-api.test/api/v1/product/${chosenPackage}`)
      .then((res) => {
        const dData = res.data.data;
        setCurrentPackage(dData);
        setAmount(dData.price);
        setFormData(() => ({
          ...formData,
          product_name: dData.name,
          product_price: dData.price,
          coverage_allowance: dData.coverage_amount,
          product_id: parseInt(chosenPackage),
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  React.useEffect(() => {
    setAuthenticated(isLoggedIn());
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseModal = () => {
    e.preventDefault();
    setOpen(false);
  };

  const handleQR = () => {
    setqrCode(generatePayload(phoneNumber, { amount }));
  };

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
    setSelectedEndDate(dayjs(date).add(1, "year"));
    const sdate = dayjs(date).format("DD-MM-YYYY");
    const ndate = dayjs(date).add(1, "year");
    const ndatef = dayjs(ndate).format("DD-MM-YYYY");
    setFormData(() => ({
      ...formData,
      start_date: sdate,
      end_date: ndatef,
    }));
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    axios
      .post(`http://influrance-api.test/api/v1/order`, formData)
      .then((res) => {
        setTimeout(() => {
          axios
            .post(`http://influrance-api.test/api/v1/order/detail`, formData)
            .then((res) => {
              console.log(res);
              navigate("/dashboard");
            })
            .catch((err) => {
              console.log(err);
            });
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const formData = { username: "jordan" };
  const handleAddBeneficiary = (e) => {
    e.preventDefault();
    if (numBeneficiaries < 3) {
      setNumBeneficiaries(numBeneficiaries + 1);
    }
  };
  const handleRemoveBeneficiary = (e) => {
    e.preventDefault();
    if (numBeneficiaries > 1) {
      setNumBeneficiaries(numBeneficiaries - 1);
    }
  };
  const handleAddressChange = (e, index) => {
    const updatedAddress = address.split(" ");
    updatedAddress[index] = e.target.value;
    setAddress(updatedAddress.join(" "));
  };
  const [formData, setFormData] = React.useState({
    order_id: location.state.orderId,
    customer_id: location.state.uid,
    product_id: null,
    product_name: null,
    product_price: null,
    coverage_allowance: null,
    coverage_claimed: null,
    coverage_left: null,
    prefix: location.state.prefix,
    firstname: location.state.firstname,
    lastname: location.state.lastname,
    citizen_id: location.state.citizenid,
    email: null,
    birthdate: null,
    start_date: null,
    end_date: null,
    address: null,
    district: null,
    sub_district: null,
    postal_code: null,
    province: null,
    beneficiary_1_prefix: null,
    beneficiary_1_firstname: null,
    beneficiary_1_lastname: null,
    beneficiary_1_phone_number: null,
    beneficiary_1_relationship: null,
    beneficiary_2_prefix: null,
    beneficiary_2_firstname: null,
    beneficiary_2_lastname: null,
    beneficiary_2_phone_number: null,
    beneficiary_2_relationship: null,
    beneficiary_3_prefix: null,
    beneficiary_3_firstname: null,
    beneficiary_3_lastname: null,
    beneficiary_3_phone_number: null,
    beneficiary_3_relationship: null,
    purchase_date: null,
    status: "order",
  });

  const handleChange = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  if (!currentPackage) {
    return null;
  }

  return (
    <>
      <Nav />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Product Detail
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel id="demo-simple-select-label">
                    Selected Product
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    fullWidth
                    name="product_name"
                    label="Product"
                    onChange={handleChange}
                    defaultValue={"default"}
                  >
                    <MenuItem value={"default"} disabled>
                      {`${currentPackage.name}`}
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="product_price"
                    label="Product Price"
                    name="product_price"
                    autoComplete="product_price"
                    defaultValue={`${currentPackage.price}`}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="coverage_allowance"
                    label="Coverage Allowance"
                    name="coverage_allowance"
                    autoComplete="coverage_allowance"
                    defaultValue={`${currentPackage.coverage_amount}`}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className={styled.textSeparator}></div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "-20px",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Insurance Holder's detail
                  </Typography>
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
                    // value={formData.prefix}
                    value={formData.prefix ? formData.prefix : "Prefix"}
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
                    value={formData.firstname ? formData.firstname : null}
                    required
                    fullWidth
                    id="firstname"
                    onChange={handleChange}
                    label="Firstname"
                  />
                </Grid>
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    required
                    fullWidth
                    id="lastname"
                    label="Lastname"
                    name="lastname"
                    onChange={handleChange}
                    value={formData.lastname ? formData.lastname : null}
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="citizen_id"
                    label="Citizen Id"
                    name="citizen_id"
                    onChange={handleChange}
                    autoComplete="citizen"
                    value={formData.citizen_id ? formData.citizen_id : null}
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
                      name="birthdate"
                      label="Birthdate"
                      inputFormat="MM/DD/YYYY"
                      onChange={(date) => {
                        const birthdateString =
                          dayjs(date).format("DD-MM-YYYY");
                        setFormData((prevState) => ({
                          ...prevState,
                          birthdate: birthdateString,
                        }));
                      }}
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
                      name="start_date"
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
                      name="end_date"
                      inputFormat="MM/DD/YYYY"
                      onChange={() => {}}
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
                    id="sub_district"
                    label="Sub District"
                    name="sub_district"
                    autoComplete="sub_district"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="postal_code"
                    name="postal_code"
                    required
                    fullWidth
                    id="postal_code"
                    label="Zip / Postal code"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="province"
                    label="province"
                    name="province"
                    autoComplete="province"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <div className={styled.textSeparator}></div>
            <Typography component="h1" variant="h5">
              Beneficiary
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {Array.from({ length: numBeneficiaries }).map((_, index) => (
                <div key={index + 1}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Stack spacing={2} direction="row">
                        <Button variant="text" onClick={handleAddBeneficiary}>
                          Add
                        </Button>
                      </Stack>
                      <InputLabel id={`beneficiary-${index + 1}-prefix-label`}>
                        Beneficiary {index + 1}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Select
                        labelId={`beneficiary-${index + 1}-prefix-label`}
                        id={`beneficiary-${index + 1}-prefix`}
                        fullWidth
                        name={`beneficiary_${index + 1}_prefix`}
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
                        name={`beneficiary_${index + 1}_firstname`}
                        required
                        fullWidth
                        id={`beneficiary-${index + 1}-firstname`}
                        onChange={handleChange}
                        label="First Name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4.5}>
                      <TextField
                        required
                        fullWidth
                        id={`beneficiary-${index + 1}-lastname`}
                        label="Lastname"
                        name={`beneficiary_${index + 1}_lastname`}
                        onChange={handleChange}
                        autoComplete="family-name"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        labelId={`beneficiary-${index + 1}-relationship-label`}
                        id={`beneficiary-${index + 1}-relationship`}
                        fullWidth
                        name={`beneficiary_${index + 1}_relationship`}
                        label="Relationship"
                        onChange={handleChange}
                        defaultValue="Relations"
                      >
                        <MenuItem value={"Relations"} disabled>
                          Relations
                        </MenuItem>
                        <MenuItem value={"Father"}>Father</MenuItem>
                        <MenuItem value={"Mother"}>Mother</MenuItem>
                        <MenuItem value={"Sister"}>Sister</MenuItem>
                        <MenuItem value={"Relative"}>Relative</MenuItem>
                        <MenuItem value={"Friend"}>Friend</MenuItem>
                      </Select>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id={`beneficiary-${index + 1}-phone`}
                        label="Phone number"
                        name={`beneficiary_${index + 1}_phone_number`}
                        autoComplete="phone"
                        onChange={handleChange}
                      />
                    </Grid>

                    {numBeneficiaries > 1 && (
                      <Grid item xs={12}>
                        <Button
                          variant="text"
                          color="secondary"
                          onClick={handleRemoveBeneficiary}
                        >
                          Remove Beneficiary
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </div>
              ))}
              <Button
                // type="submit"
                type="button"
                fullWidth
                variant="contained"
                onClick={() => {
                  handleOpen();
                  handleQR();
                }}
                // onClick={sendEmailToUser}
                sx={{ mt: 3, mb: 2, height: "60px" }}
                style={{ backgroundColor: "#FFDA88", color: "#252525" }}
              >
                Proceed to checkout
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{}}
              >
                <Box sx={style}>
                  <div>
                    <img
                      src="./promptpay.png"
                      alt="Image"
                      style={{ width: "300px" }}
                    />
                  </div>
                  <div>
                    <QRCode
                      value={qrCode}
                      style={{
                        width: "250px",
                        height: "250px",
                      }}
                    />
                  </div>
                  <Button
                    // type="submit"
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, mb: 2, height: "50px" }}
                    style={{ backgroundColor: "#FFDA88", color: "#252525" }}
                  >
                    Confirm
                  </Button>
                </Box>
              </Modal>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Footer />
    </>
  );
}
