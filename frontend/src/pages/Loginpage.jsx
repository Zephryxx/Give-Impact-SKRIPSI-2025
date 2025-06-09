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
  const [formData, setFormData] = useState({
    newPassword:"",
    confirmPassword:"",
  });

  const handleInputChange = (e) =>{
    const {newPassword, value} = e.target;
    setFormData(prev => ({ ...prev, [newPassword]: value}));
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log("Submitting data:", formData)
    alert("Form Submitted!");

    setFormData({
        newPassword:"",
        confirmPassword:"",
    });
    setIsPopupOpen(false);
  }
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

                    <Link className="greyText" onClick={() => setIsPopupOpen(true)}>Forgot Password?</Link>
                    {isPopupOpen &&(
                        <div className="popup-overlay-resetPassword">
                            <div className="popup-content-resetPassword">
                                <button className="close-btn" onClick={() => setIsPopupOpen(false)}>
                                    &times;
                                </button>

                                <h2 className="resetPassword-title">Reset Password</h2>
                                <form onSubmit={handleSubmit} className='form-resetPassword'>
                                    <input 
                                    type="text" 
                                    className="input-resetPassword" 
                                    name='newPassword'
                                    placeholder='New Password'
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                    />
                                    <input 
                                    type="text" 
                                    className="input-resetPassword" 
                                    name='confirmPassword'
                                    placeholder='Confirm Password'
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    required
                                    />

                                    <button type="submit"className="submit-button">Confirm</button>
                                </form>
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