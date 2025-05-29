  import React from 'react'
  import '../Style/Registerdonatur.css'
  import { useNavigate } from 'react-router-dom';
  function Registerdonatur() {
      const navigate = useNavigate();

    return (
      <div className='registerpage'>
          <div className="wrapperRegister">
              <h1 className='regis-title'>Registration</h1>
              {/* From Register */}
              <form className='registrasi-form'>

                  <h5 className='registext'>Name:</h5>
                  <input className='input-register' type="text" placeholder="Name"></input>
                  
                  <h5 className='registext'>Phone Number:</h5>
                  <input className='input-register' type="text" placeholder="Phone Number"></input>

                  <h5 className='registext'>Email:</h5>
                  <input className='input-register' type="email" placeholder="Email"></input>
                  
                  <h5 className='registext'>Password:</h5>
                  <input className='input-register' type="password" placeholder="Password"></input>
                  
                  <h5 className='registext'>Confirm Password:</h5>
                  <input className='input-register' type="password" placeholder="Confirm Password"></input>

                  
              </form>
              {/* Button Submit */}   
              <button className="button-register" type='submit' onClick={() => navigate('/login')}>Register</button>
          </div>
      </div>
    )
  }

  export default Registerdonatur;