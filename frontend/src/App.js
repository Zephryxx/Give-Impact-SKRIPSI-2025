import logo from './logo.svg';
import './App.css';
import {BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import Chooserole from './pages/Chooserole';
import Registerdonatur from './pages/Registerdonatur';
import Registerfoundation from './pages/Registerfoundation';
import Loginpage from './pages/Loginpage';
import Homepage from './pages/Homepage';
import Donationpage from './pages/Donationpage';
import DonationDetail from './pages/Donationdetail';
import Paymentpage from './pages/Paymentpage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Chooserole/>}></Route>
        <Route path='/registerdonatur' element={<Registerdonatur/>}></Route>
        <Route path='/registerfoundation' element={<Registerfoundation/>}></Route>
        <Route path='/login' element={<Loginpage/>}></Route>
        <Route path='/home' element={<Homepage/>}></Route>
        <Route path='/donationpage' element={<Donationpage/>}></Route>
        <Route path='/donationdetail' element={<DonationDetail/>}></Route>
        <Route path='/payment' element={<Paymentpage/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
