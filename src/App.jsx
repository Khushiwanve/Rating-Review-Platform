import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Bollywood from './Pages/Bollywood';
import OldBollywood from './Pages/OldBollywood'; // ✅ correct case
import Login from './Pages/Login';
import Signup from './Pages/signup';
import Dashboard from './Pages/Dashboard';
import Search from './Pages/Search';
import Watchlist from './Pages/Watchlist'; // Import Watchlist page
import ReviewsPage from './Pages/ReviewsPage';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bollywood" element={<Bollywood />} />
        <Route path="/oldbollywood" element={<OldBollywood />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<Watchlist />} /> {/* Add Watchlist route */}
        <Route path="/allreviews" element={<ReviewsPage />} />

      </Routes>
    </>
  );
}

export default App;








