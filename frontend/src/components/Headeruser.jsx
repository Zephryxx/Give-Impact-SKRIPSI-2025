import React, {useEffect, useRef, useState, useContext} from "react";
import '../styles/Headeruser.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
}

function Headeruser() {
    const navigate = useNavigate();
    const { authState, logout } = useContext(AuthContext);
    const { isAuthenticated, user } = authState;

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useOutsideAlerter(dropdownRef, () => setDropdownOpen(false));

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/home');
    };

    const handleEditProfile = () => {
        if (user?.tipe_akun === 'Foundation') {
            navigate('/profile/foundation');
        } else if (user?.tipe_akun === 'Donatur') {
            navigate('/profile/donatur');
        } else {
            navigate('/');
        }
        setDropdownOpen(false);
    };

    const handleTitleClick = () => {
        if (isAuthenticated) {
            if (user?.tipe_akun === 'Foundation') {
                navigate('/home/foundation'); 
            } else if (user?.tipe_akun === 'Donatur') {
                navigate('/home'); 
            } else {
                navigate('/home'); 
            }
        } else {
            navigate('/home');
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="navbar">
            <div className="navbar-title" onClick={handleTitleClick}>Give Impact</div>
            
            {/* Ubah .navbar-buttons menjadi .navbar-center */}
            <div className="navbar-center"> 
                {isAuthenticated && user?.tipe_akun && (
                    <span className="user-type">{user.tipe_akun}</span>
                )}
            </div>

            {/* PERBAIKAN UTAMA: Bungkus semua elemen kanan dengan .navbar-right */}
            <div className="navbar-right" ref={dropdownRef}>
                {isAuthenticated ? (
                    <>
                        {/* Pindahkan onClick dan SVG langsung ke dalam .profile-icon-box */}
                        <div className="profile-icon-box" onClick={toggleDropdown}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        </div>

                        {isDropdownOpen && (
                            <div className="dropdown-menu-profile">
                                <ul>
                                    <li>
                                        <button className='dropdown-button' onClick={handleEditProfile}>
                                            Info Akun
                                        </button>
                                    </li>
                                    <li>
                                        <hr /> {/* Pemisah visual */}
                                    </li>
                                    <li>
                                        {/* Gunakan class 'logOut-btn' untuk styling khusus */}
                                        <button className="dropdown-button logOut-btn" onClick={handleLogout}>
                                            Log Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </>
                ) : (
                    <button className="login-button-navbar" onClick={() => navigate('/login')}>
                        Login
                    </button>
                )}
            </div>
        </div>
    );
}

export default Headeruser;