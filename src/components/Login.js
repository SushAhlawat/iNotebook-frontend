import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({ name: "", email: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const getUser = async (e) => {
        e.preventDefault();
        console.log("user" + JSON.stringify(user));
        const url = "http://notebook.ap-south-1.elasticbeanstalk.com/auth"
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        const response = await fetch(`${url}/login`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (data.authtoken) {
            console.log("data in fi" + JSON.stringify(data.authtoken));
            localStorage.setItem("token", `${data.authtoken}`)
            navigate("/");
        }
    }

    return (
        <div className="container my-3">
            <h1>Login Here:</h1>
            <form className='my-3' onSubmit={getUser}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={user.email} placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={user.password} placeholder="password" />
                </div>
                <button type="submit" className="btn btn-dark" >Login</button>
            </form>
        </div>
    )
}

export default Login
