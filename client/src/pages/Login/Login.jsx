import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (success) {
      navigate("/udashboard");
    }
    setSuccess(false);
  }, [success]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/auth/login", {
        username: user,
        password: pwd,
      })
      .then((res) => {
        console.log(res.data);
        let token = res.data;
        localStorage.setItem("jwt", token);
        setSuccess(true);
      });
    // console.log("submitted", user, pwd);
    // setUser("");
    // setPwd("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUser(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPwd(e.target.value)}
        ></input>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
