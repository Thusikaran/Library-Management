import "./Register.css"
import img from "../assets/img/book.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const[userName,setUserName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [userNameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    //const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        let isValid = true;

        if (!userName) {
            setUserNameError("* User name cannot be empty.");
            isValid = false;
        } else {
            setUserNameError(""); 
        }

        if (!email) {
            setEmailError("* Email cannot be empty.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("* Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(""); 
        }

        if (!password) {
            setPasswordError("* Password cannot be empty.");
            isValid = false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError(
                `* at least 8 characters ,
                contain uppercase , lowercase, number and special character.`
            );
            
            isValid = false;
        } else {
            setPasswordError(""); 
        }

        return isValid;
    };

    const handleSubmit =async()=>{
        if (validate()) {
            const data = {
                username: userName.toLowerCase(),
                email: email,
                password: password,
            };
         
      try {
        const response = await axios.post("http://localhost:5127/api/account/register", data);
        if (response.status === 200) {
          window.alert("Registration Successful!");
          navigate("/");
        } else {
          window.alert("Registration failed. Please try again.");
        }
      } catch (error) {
        console.error("Registration Error: ", error);
        window.alert("An error occurred. Please try again later.");
      }

      setUserName("");
      setEmail("");
      setPassword("");
      setUserNameError("");
      setEmailError("");
      setPasswordError("");
    }

    }
  return (
    <div className='page'>
        <div className='page-left'>
            <img src={img} alt="" />
            <h2>BookBank</h2>
            <h4>SignUp</h4>
            <p>A library management system is a computerized information system that supports the management of library resources</p>
            <span>Do you have an account <u onClick={()=>navigate("/")}>Login</u></span>
        </div>
        <div className='page-right'>
            {/* <div className="error">
                error
            </div> */}
            <div className="inputBox">
                <input placeholder="User Name" className={userNameError == "" ? "input":"errorInput"} type="text" value={userName}  onChange={(e)=>setUserName(e.target.value)}/>
                <span>{userNameError}</span>
            </div>
            <div className="inputBox">
                <input placeholder="Email" className={emailError == "" ? "input":"errorInput"}  type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <span>{emailError}</span>
            </div>
            <div className="inputBox">
                <input placeholder="password" className={passwordError == "" ? "input":"errorInput"}  type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <span>{passwordError}</span>
            </div>
            <button onClick={handleSubmit}>SignUp</button>
        </div>
    </div>
  )
}

export default Register