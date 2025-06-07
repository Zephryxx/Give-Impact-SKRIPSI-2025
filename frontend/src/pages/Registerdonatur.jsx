  import React, { useState } from 'react';
  import '../styles/Registerdonatur.css'
  import { useNavigate, Link } from 'react-router-dom';
  
  function Registerdonatur() {
      const navigate = useNavigate();
      const [name, setName] = useState('');
      const [phoneNumber, setPhoneNumber] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');
      const [isLoading, setIsLoading] = useState(false);

      const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!name || !phoneNumber || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        
        const phoneRegex = /^\d{10,15}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setError("Please enter a valid phone number (10-15 digits).");
            return;
        }

        if (name.trim().length < 5) {
            setError("Please enter your real name (at least 5 characters).")
            return;
        }


        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8081/api/register/donatur', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama: name,
                    no_telp: phoneNumber,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || `Error: ${response.status}`);
            } else {
                setSuccessMessage(data.message || "Registration successful! Redirecting to login...");
                setName('');
                setPhoneNumber('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            console.error("Registration failed:", err);
            setError("Registration failed. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='registerpage'>
            <div className="wrapperRegister">
                <h1 className='regis-title'>Donor Registration</h1>
                <form className='registrasi-form' onSubmit={handleSubmit}>
                    <h5 className='registext'>Name:</h5>
                    <input 
                        className='input-register' 
                        type="text" 
                        placeholder="Enter your full name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        aria-label="Name"
                    />
                    
                    <h5 className='registext'>Phone Number:</h5>
                    <input 
                        className='input-register' 
                        type="tel"
                        placeholder="Enter your phone number" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        aria-label="Phone Number"
                    />

                    <h5 className='registext'>Email:</h5>
                    <input 
                        className='input-register' 
                        type="email" 
                        placeholder="Enter your email address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                    />
                    
                    <h5 className='registext'>Password:</h5>
                    <input 
                        className='input-register' 
                        type="password" 
                        placeholder="Create a password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Password"
                    />
                    
                    <h5 className='registext'>Confirm Password:</h5>
                    <input 
                        className='input-register' 
                        type="password" 
                        placeholder="Confirm your password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        aria-label="Confirm Password"
                    />

                    <div className='askTxt'>
                        Already have an account?
                        <Link to="/login" className='greyText-signup'> Log in</Link> 
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}

                    <button className="button-register" type='submit' disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
  }

  export default Registerdonatur;