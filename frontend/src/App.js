import logo from './logo.svg';
import './App.css';
import {BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Chooserole from './pages/Chooserole';
import Registerdonatur from './pages/Registerdonatur';
import Registerfoundation from './pages/Registerfoundation';
import Loginpage from './pages/Loginpage';
import Homepage from './pages/Homepage';
import Artikelepage from './pages/Artikelpage';
import Donationpage from './pages/Donationpage';
import DonationDetail from './pages/Donationdetail';
import Paymentpage from './pages/Paymentpage';
import Profiledonatur from './pages/Profiledonatur';
import Profilefoundation from './pages/Profilefoundation';
import Homepagefoundation from './pages/Homepagefoundation';
import Buatkampanye from './pages/Buatkampanye';
import Donationcheck from './pages/Donationcheck';
import Kampanyedetail from './pages/Kampanyedetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Loginpage/>}></Route>
          <Route path='/' element={<Chooserole/>}></Route>
          <Route path='/register/donatur' element={<Registerdonatur/>}></Route>
          <Route path='/register/foundation' element={<Registerfoundation/>}></Route>
          <Route path='/home' element={<Homepage/>}></Route>
          <Route path='/artikel' element={<Artikelepage/>}></Route>
          <Route path='/donationpage' element={<Donationpage/>}></Route>
          <Route path='/donationdetail' element={<DonationDetail/>}></Route>
          <Route 
            path='/home/foundation' 
            element={
              <ProtectedRoute>
                <Homepagefoundation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/payment' 
            element={
              <ProtectedRoute>
                <Paymentpage />
              </ProtectedRoute>
            } 
          />
          <Route
            path='/profile/donatur'
            element={
              <ProtectedRoute>
                <Profiledonatur/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/foundation'
            element={
              <ProtectedRoute>
                <Profilefoundation/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/buatkampanye'
            element={
              <ProtectedRoute>
                <Buatkampanye/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/donationcheck'
            element={
              <ProtectedRoute>
                <Donationcheck/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/kampanyedetail'
            element={
              <ProtectedRoute>
                <Kampanyedetail/>
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
