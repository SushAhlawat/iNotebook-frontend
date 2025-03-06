import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/NoteContext';

function Signup() {
    const [user, setUser] = useState({name:"", email:"", password:""});
    const navigate = useNavigate();
    const {token, setToken} = useContext(noteContext);

    const onChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const addUser = async(e) => {
        e.preventDefault();
        console.log("user"+JSON.stringify(user));
        const url = "http://notebook.ap-south-1.elasticbeanstalk.com/auth"
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")
        const response = await fetch(`${url}/createuser`, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(user)
        });
        const data = await response.json();
        if(data.authtoken){
        console.log("data sign"+JSON.stringify(data));
        localStorage.setItem("token", data.authtoken);
        setToken(data.authtoken);
        navigate("/");
        }
    }

    return (
        <div className="container my-3">
            <h1>Create an Account</h1>
            <form className='my-3' onSubmit={addUser}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={user.name} required minLength={3} placeholder="Enter your Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={user.email} required placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={user.password} required minLength={8} placeholder="password" />
                </div>
                <button type="submit" className="btn btn-dark" >Signup</button>
            </form>
        </div>
    )
}

export default Signup
