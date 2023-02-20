import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup(props) {
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const Navigate = useNavigate();
  const { showAlert } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:5000/auth/create";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userDetail.name,
        email: userDetail.email,
        password: userDetail.password,
      }),
    });
    const resJson = await response.json();
    if (resJson.success) {
      localStorage.setItem("token", resJson.authToken);
      Navigate("/");
      showAlert("Sign Up Successfully", "success");
    } else {
      showAlert("E-mail already in use.. So try with another email", "danger");
    }
  };

  const onChnage = (e) => {
    //add a value to existing note value(append)
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3 col-md-10">
      <h2 className="mt-3 mb-3">Create an Account in iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={onChnage}
            id="name"
            aria-describedby="emailHelp"
            required
          />
        </div>
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
            required
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
            minLength="5"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cexampleInputPassword1" className="form-label">
            Conform Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            onChange={onChnage}
            minLength="5"
            id="cexampleInputPassword1"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
}
