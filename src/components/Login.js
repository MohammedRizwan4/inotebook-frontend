import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook-backend-amber.vercel.app/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password}) 
        });
        const json = await response.json();

        if(json.success){
            //save the auth token
            localStorage.setItem('token',json.authToken);
            props.showAlert("Login SuccessFull","success")
            navigate("/");
        }else{
            props.showAlert("Invalid Details","danger")
        }
    }
    return (
        <div className='mt-5'>
            <h1>Login to continue to iNotebook</h1>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} name="password" onChange={onChange} id="password" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;
