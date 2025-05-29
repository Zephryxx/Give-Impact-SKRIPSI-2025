import React from "react";
import '../Style/Headeruser.css';
import { useNavigate } from 'react-router-dom';


function Headeruser() {
      const navigate = useNavigate();
    
    return(
        <div className="navbar">
            <div className="navbar-title" onClick={() => navigate('/home')}>Give Impact</div>
            <div className="navbar-buttons">
                <a className='donasi-button'>Donatur</a>
            </div>
            <div className="profile-icon" />
        </div>
    )
}

export default Headeruser;