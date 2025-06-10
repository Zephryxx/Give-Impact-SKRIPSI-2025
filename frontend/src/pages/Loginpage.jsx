import React,{useState, useContext} from 'react'
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Loginpage.css';
import { AuthContext } from '../context/AuthContext';

function Loginpage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (!email || !password) {
        setErrorMsg('Email and password are required.');
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch('http://localhost:8081/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
                setErrorMsg(data.message || `Login failed. Status: ${response.status}`);
            } else {
                login(data.user, data.token);
                setErrorMsg('');
                const userType = data.user.tipe_akun;

                if (userType === 'Foundation') {
                    navigate('/home/foundation'); 
                } else if (userType === 'Donatur') {
                    navigate('/home');
                } else {
                    console.warn("Unknown user type, redirecting to generic home.");
                }
            }
    } catch (err) {
        console.error('Login API request failed:', err);
        setErrorMsg('Login failed. Please check your connection and try again.');
    } finally {
        setIsLoading(false);
    }
  };

  /*Pop Up*/
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [resetStep, setResetStep] = useState(1);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const handleOpenPopup = () => {
        setIsPopupOpen(true);
        setResetStep(1);
        setResetEmail('');
        setNewPassword('');
        setConfirmNewPassword('');
        setResetMessage('');
    };

  const handleCheckEmail = async () => {
        setIsLoading(true);
        setResetMessage('');
        try {
            const response = await fetch('http://localhost:8081/api/password/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setResetMessage(data.message);
            setResetStep(2);

        } catch (err) {
            setResetMessage(err.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

  const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setResetMessage("Passwords do not match. Please try again.");
            return;
        }
        if (newPassword.length < 6) {
            setResetMessage("Password must be at least 6 characters long.");
            return;
        }
        
        setIsLoading(true);
        setResetMessage('Resetting password...');

        try {
            const response = await fetch('http://localhost:8081/api/password/reset', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: resetEmail, newPassword: newPassword }),
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'An unknown error occurred during reset.');
            }

            setResetMessage(data.message + " You can now log in.");
            setTimeout(() => {
                setIsPopupOpen(false);
            }, 500);

        } catch (err) {
            console.error("Password reset submission failed:", err);
            setResetMessage(err.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="wrapperLogin">
                <form className='login-form' onSubmit={handleLogin}> 
                    <h1 className='login-title'>Login</h1>

                    <h5 className='Logintext'>Email:</h5>
                    <input
                        className='inputLogin'
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                        required
                    />

                    <h5 className='Logintext'>Password:</h5>
                    <input
                        className='inputPassword'
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Password"
                        required
                    />

                    <Link className="greyText" onClick={handleOpenPopup}>Forgot Password?</Link>
                    {isPopupOpen &&(
                        <div className="popup-overlay-resetPassword">
                            <div className="popup-content-resetPassword">
                                <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
                                    &times;
                                </button>

                                <h2 className="resetPassword-title">Reset Password</h2>
                                {resetStep === 1 && (
                                    <div className='form-resetPassword'>
                                        <p>Enter the email address associated with your account.</p>
                                        <input type="email" className="input-resetPassword" name='checkEmail' placeholder='Email Address' value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
                                        <button type="button" className='submit-button' onClick={handleCheckEmail} disabled={isLoading}>
                                            {isLoading ? 'Checking...' : 'Confirm Email'}
                                        </button>
                                    </div>
                                )}
                                {resetStep === 2 && (
                                    <div className='form-resetPassword'>
                                        <p>Enter your new password for <strong>{resetEmail}</strong>.</p>
                                        <input type="password" className="input-resetPassword" name='newPassword' placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                        <input type="password" className="input-resetPassword" name='confirmPassword' placeholder='Confirm New Password' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                                        <button type="button" className="submit-button" onClick={handleSubmit} disabled={isLoading}>
                                            {isLoading ? 'Resetting...' : 'Confirm Reset'}
                                        </button>
                                    </div>
                                )}
                                {resetMessage && <p className="popup-message">{resetMessage}</p>}
                            </div>
                        </div>
                    )}
                    {errorMsg && <p className="error-message">{errorMsg}</p>}

                    <button className="login-button" type='submit' disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className='askTxt'>
                    Don't have an account yet?
                    <Link to="/" className='greyText-signup'> Sign Up</Link> 
                </div>
            </div>
        </div>
    );
}

export default Loginpage;