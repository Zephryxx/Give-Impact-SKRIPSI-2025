import logo from './logo.svg';
import './App.css';
import {BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import Chooserole from './Pages/Chooserole';
import Registerdonatur from './Pages/Registerdonatur';
import Registerfoundation from './Pages/Registerfoundation';
import Loginpage from './Pages/Loginpage';
import Homepage from './Pages/Homepage';
import Donationpage from './Pages/Donationpage';
import DonationDetail from './Pages/Donationdetail';
import Paymentpage from './Pages/Paymentpage';
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
