import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../Style/Chooserole.css'
function Chooserole() {

  const navigate = useNavigate();

  return (
    <div className="chooserole-container">
        <div className="chooserole-wrapper">

          <form className='chooserole-form'>
            <h1 className="chooserole-title">Choose Role</h1>
            <button className='chooserole-button'type='submit' onClick={() => navigate('/registerdonatur')}>Donatur</button>
            <button className='chooserole-button' type='submit' onClick={() => navigate('/registerfoundation')}>Foundation</button>
          </form>

        </div>
    </div>

  )
}

export default Chooserole