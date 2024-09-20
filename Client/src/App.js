import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import Home from './pages/Home/Home';
import CampaignDetails from './pages/CampaignDetails/CampaignDetails';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import PageLayout from './pages/Pagelayout/PageLayout';
import DonationSuccess from './pages/DonationSuccess/DonationSuccess';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/campaigns/:id' element={<CampaignDetails />} />
        <Route path='/donation_success' element={<DonationSuccess />}/>
        <Route path='/login' element={ <PageLayout /> }>
          <Route index element={ <LoginPage /> } />
          <Route path='/login/profile' element={ <ProfilePage /> } />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
