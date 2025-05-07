import React, { useState } from "react";
import "./auth.style.less";
import LogoComponent from "../../components/logo/logo.component";
import eye from "../../assets/eye.svg";
import spinner from "../../assets/spinner.svg";
import InputField from "../../components/input/inputField.component";
import { AuthenticateUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const AuthComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = credentials.username.trim();
    const trimmedPassword = credentials.password.trim();
    
    if (!trimmedUsername || !trimmedPassword) {
      alert("Username and password cannot be empty or all spaces.");
      return;
    }

    setIsLoading(true);
    
    try {
      const data = await AuthenticateUser(trimmedUsername, trimmedPassword);
      console.log("Login successful:", data);
      setIsLoading(false);
      navigate("/"); // Redirect to the gallery page
    } catch (error) {
      alert(error.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
        <LogoComponent />
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <div className="wrapper">
          <InputField
            required={true}
            id="username"
            name="username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
            label="Username"
          />
          <InputField
            required={true}
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            label="Password"
            icon={<img src={eye} alt="show" />}
          />

          <button type="submit" className="submit-button">
            {isLoading ? (
              <img src={spinner} alt="spinner" className="spinner" />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthComponent;
