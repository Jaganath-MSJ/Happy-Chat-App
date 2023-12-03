import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import axios from "axios";
import logo from "../assests/logo.png";
import { registerRoute } from "../utils/APIRoutes";
import { errorOptions, successOptions } from "../utils/toastOptions";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("happy-chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (!data.status) {
        toast.error(data.msg, errorOptions);
      } else {
        localStorage.setItem("happy-chat-app-user", JSON.stringify(data.user));
        toast.success("Registration successful.", successOptions);
        navigate("/");
      }
    }
  };

  function handleValidation() {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "password and confirm password should be same.",
        errorOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "username should be greater than 3 characters.",
        errorOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "password should be equal or greater than 8 characters.",
        errorOptions
      );
      return false;
    } else if (email === "") {
      toast.error("email is required.", errorOptions);
      return false;
    }
    return true;
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value.trim() });
  };

  return (
    <FromContainer>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={logo} alt="logo" />
          <h1>Happy Chat</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          autoComplete="happy-chat-user"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          autoComplete="happy-chat-user"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          autoComplete="happy-chat-user"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          autoComplete="happy-chat-user"
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account ? <Link to="/login">Login</Link>
        </span>
      </form>
    </FromContainer>
  );
};

const FromContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
