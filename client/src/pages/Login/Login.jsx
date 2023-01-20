import React from "react";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", user, pwd);
    setUser("");
    setPwd("");
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
