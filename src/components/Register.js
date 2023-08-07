import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = (props) => {

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const navigate = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook-backend-amber.vercel.app/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email,password: credentials.password}) 
        });
        const json = await response.json();

        if(json.success){
            //save the auth token
            localStorage.setItem('token-register',json.authToken);
            props.showAlert("Register SuccessFull","success")
            navigate("/login");
        }else{            
            props.showAlert("Invalid Details","danger")
        }
    }
    return (
        <div className='mt-5'>
            <h1>Create an account to use iNotebook</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onchange} id="name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} onChange={onchange} id="email" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onchange} id="password" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' value={credentials.cpassword} onChange={onchange} id="cpassword" required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Register;
