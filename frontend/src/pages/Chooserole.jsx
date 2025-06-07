import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Chooserole.css'

function Chooserole() {

  const navigate = useNavigate();

  return (
    <div className="chooserole-container">
        <div className="chooserole-wrapper">

          <form className='chooserole-form'>
            <h1 className="chooserole-title">Choose Role</h1>
            <button className='chooserole-button'type='submit' onClick={() => navigate('/register/donatur')}>Donatur</button>
            <button className='chooserole-button' type='submit' onClick={() => navigate('/register/foundation')}>Foundation</button>
          </form>

          <div className='askTxt'>
            Already have an account?
            <Link to="/login" className='greyText-signup'> Log in</Link> 
          </div>

        </div>
    </div>

  )
}

export default Chooserole