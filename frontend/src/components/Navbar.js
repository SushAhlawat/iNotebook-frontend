import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import noteContext from '../context/NoteContext';

function Navbar() {
    const location = useLocation().pathname;
    const {token, setToken} = useContext(noteContext);

    const userLogout =()=>{
        console.log("helo")
        localStorage.removeItem("token");
        setToken(localStorage.getItem("token"));
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Navbar</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${location === '/' ? "active" : ""}`}>
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className={`nav-item ${location === '/about' ? "active" : ""}`}>
                        <Link className="nav-link" to="/about">About</Link>
                    </li>
                    <li className={`nav-item ${location === '/notes' ? "active" : ""}`}>
                        <Link className="nav-link" to="/notes">Notes</Link>
                    </li>
                </ul>
                {
                    token && token !== "undefined"?
                        <button type='button' className="btn btn-light mx-1" onClick={userLogout}>Logout</button>
                        :
                        <>
                            <Link className="btn btn-light mx-1" to="/login">Login</Link>
                            <Link className="btn btn-light mx-1" to="/signup">Signup</Link>
                        </>
                }
            </div>
        </nav>
    )
}

export default Navbar
