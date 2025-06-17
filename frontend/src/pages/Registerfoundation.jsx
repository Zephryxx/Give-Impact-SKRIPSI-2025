import React, { useState } from 'react';
import '../styles/Registerfoundation.css'
import { useNavigate, Link } from 'react-router-dom';

function Registerfoundation() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [foundationName, setFoundationName] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [noPajak, setNoPajak] = useState('');
    const [rekening, setRekening] = useState('');
    const [jenisProvider, setJenisProvider] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const providerOptions = ["BCA", "OVO", "DANA", "GOPAY", "Mandiri", "BNI"];

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!foundationName || !userName || !phoneNumber || !noPajak || !rekening || !jenisProvider || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/register/foundation`, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nama_foundation: foundationName,
                    nama_user: userName,
                    email: email,
                    no_telp: phoneNumber,
                    password: password,
                    no_pajak: noPajak,
                    rekening: rekening,
                    j_provider: jenisProvider
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || `Error: ${response.status} ${data.error || ''}`);
            } else {
                setSuccessMessage(data.message || "Foundation registration successful! Redirecting to login...");
                setFoundationName('');
                setUserName('');
                setEmail('');
                setPhoneNumber('');
                setPassword('');
                setConfirmPassword('');
                setNoPajak('');
                setRekening('');
                setJenisProvider('');
                
                setTimeout(() => {
                    navigate('/login'); 
                }, 2000);
            }
        } catch (err) {
            console.error("Foundation registration failed:", err);
            setError("Registration failed. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

  return (
        <div className='registerpage'>
            <div className="wrapperRegister">
                <h1 className='regis-title'>Foundation Registration</h1>
                <form className='registrasi-form' onSubmit={handleSubmit}>
                    <h5 className='registext'>Foundation Name:</h5>
                    <input 
                        className='input-register' 
                        type="text" 
                        placeholder="Enter foundation's official name" 
                        value={foundationName} 
                        onChange={(e) => setFoundationName(e.target.value)}
                        aria-label="Foundation Name"
                        required
                    />

                    <h5 className='registext'>User Name:</h5>
                    <input 
                        className='input-register' 
                        type="text" 
                        placeholder="Enter your name" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)}
                        aria-label="User Name"
                        required
                    />

                    <h5 className='registext'>Contact Email:</h5>
                    <input 
                        className='input-register' 
                        type="email" 
                        placeholder="Enter email address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                        required
                    />

                    <h5 className='registext'>Foundation Phone Number:</h5>
                    <input 
                        className='input-register' 
                        type="tel" 
                        placeholder="Enter contact number" 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        aria-label="Foundation Phone Number"
                        required
                    />

                    <h5 className='registext'>Password:</h5>
                    <input 
                        className='input-register' 
                        type="password" 
                        placeholder="Create a password (min. 6 characters)" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Password"
                        required
                    />
                    
                    <h5 className='registext'>Confirm Password:</h5>
                    <input 
                        className='input-register' 
                        type="password" 
                        placeholder="Confirm your password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        aria-label="Confirm Password"
                        required
                    />
                    
                    <h5 className='registext'>Tax Number (NPWP):</h5>
                    <input 
                        className='input-register' 
                        type="text" 
                        placeholder="Enter foundation's tax number" 
                        value={noPajak} 
                        onChange={(e) => setNoPajak(e.target.value)}
                        aria-label="Tax Number"
                        required
                    />

                    <div className="side-by-side-container">
                        <div className="input-group">
                            <h5 className='registext'>Provider Type:</h5>
                            <select className='input-rekening' value={jenisProvider} onChange={(e) => setJenisProvider(e.target.value)} required>
                                <option value="" disabled>Select Provider</option>
                                {providerOptions.map(option => <option key={option} value={option}>{option}</option>)}
                            </select>
                        </div>
                        <div className="input-group">
                            <h5 className='registext'>Account Number:</h5>
                            <input className='input-rekening' type="text" placeholder="Enter account number only" value={rekening} onChange={(e) => setRekening(e.target.value)} required />
                        </div>
                    </div>

                    <div className='askTxt'>
                        Already have an account?
                        <Link to="/login" className='greyText-signup'> Log in</Link> 
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    
                    <button className="button-register" type='submit' disabled={isLoading}>
                        {isLoading ? 'Registering Foundation...' : 'Register Foundation'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Registerfoundation;