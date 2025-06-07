import React, {useEffect, useRef, useState} from "react";
import '../styles/Headeruser.css';
import { useNavigate } from 'react-router-dom';

let useClickOutside = (handler) =>{
    let domNode = useRef();

useEffect(() =>{
    let maybeHandler = (event) => {
        if(!domNode.current.contains(event.target)){
            handler();
        }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () =>{
        document.removeEventListener("mousedown", maybeHandler);
    }
})
    return domNode
}

function Headeruser() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    let domNode = useClickOutside(() =>{
        setIsOpen(false);
    })
    
    return(
        <div className="navbar">
            <div className="navbar-title" onClick={() => navigate('/home')}>Give Impact</div>
            <div className="navbar-buttons">
                <a className='donasi-button'>Donatur</a>
            </div>
            <div className="profile-icon" onClick={toggleDropdown} ref={domNode}>
                <img src="" alt="" />
                {isOpen && (
                    <div className="dropdown-menu-profile">
                        <ul>
                            <li>
                                <button className='info-akun-btn' onClick={() => navigate('/profiledonatur')}>
                                Info Akun
                                </button>
                            </li>
                            <li>
                                <button className="logOut-btn" onClick={() => navigate('/login')}>Log Out</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Headeruser;