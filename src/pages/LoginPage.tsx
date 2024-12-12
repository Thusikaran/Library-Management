import "./Register.css";
import img from "../assets/img/book.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../services/Service";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!userName || !password) {
      setError("Username and Password cannot be empty.");
      return;
    }

    const result = await checkLogin(userName.toLowerCase(), password);

    if (result.success) {
      window.alert(`Welcome, ${result.data.userName}`);
       navigate("/book");
    } else {
      setError(result.message || "An unknown error occurred.");
    }
  };

  return (
    <div className="page">
      <div className="page-left">
        <img src={img} alt="" />
        <h2>BookBank</h2>
        <h4>Login</h4>
        <p>
          A library management system is a computerized information system that supports the management of library resources, including their acquisition, representation, and circulation. It is composed of interconnected subsystems that work together to achieve the common purpose of efficiently managing library operations.
        </p>
        <span>
          Don't you have an account?{" "}
          <u onClick={() => navigate("/register")}>Register</u>
        </span>
      </div>
      <div className="page-right">
        {error && <div className="error">{error}</div>}
        <div className="inputBox">
          <input
            placeholder="User Name"
            className="input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="inputBox">
          <input
            placeholder="Password"
            className="input"
            type="password" // changed to password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
