import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../Style/Loginpage.css';
function Loginpage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Contoh validasi sederhana (bisa diganti dengan validasi dari database)
    if (email === 'admin@example.com' && password === 'password123') {
      setErrorMsg('');
      // Lakukan redirect atau logic login berhasil di sini
      console.log('Login success');
    } else {
      setErrorMsg('Email atau password salah.');
    }
  };
  return(
    <div className="login-container">
      <div className="wrapperLogin">

        <form className='login-form'>
          <h1 className='login-title'>Login</h1>
          <h5 className='Logintext'>Email:</h5>
          <input
            className='inputLogin'
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5 className='Logintext'>Password:</h5>
          <input
            className='inputPassword'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="greyText" href="#">Forgot Password?</a>

          {errorMsg && <p className="error-message">{errorMsg}</p>}

          <button className="login-button" type='submit'onClick={() => navigate('/home')}>Login</button>
        </form>

        <a className='askTxt'>
          Don't have account yet?
          <span className='greyText-signup' href="#">Sign Up</span>
        </a>
      </div>
    </div>
  )
}

export default Loginpage;