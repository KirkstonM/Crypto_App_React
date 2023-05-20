import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import './index.css';
import { useSelector } from 'react-redux';
import { currentMode } from './features/coinSlice';
import CoinDescription from './pages/CoinsDescription/CoinDescription';
import Navigation from './components/navigation/Navigation';


function App() {

  const selectedMode = useSelector(currentMode);
  return (
    <div className='App' id={selectedMode}>
      |<Navigation />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/coins/:id' element={<CoinDescription />} />
      </Routes>
    </div>
  )
}

export default App