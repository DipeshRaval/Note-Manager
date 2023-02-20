import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });
  const { showAlert } = props;

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const resJson = await response.json();
    console.log(resJson);
    if (resJson.success) {
      localStorage.setItem("token", resJson.authToken);
      Navigate("/");
      showAlert("Logged In Successfully", "success");
    } else {
      showAlert("Invalid creadentials", "danger");
    }
  };

  const onChnage = (e) => {
    //add a value to existing note value(append)
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-3 col-md-10">
      <h2 className="mt-3 mb-3">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={onChnage}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={onChnage}
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
