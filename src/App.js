import React from 'react'
import FetchData from './components/FetchData';
import FetchData2 from './components/FetchData2';
import Hourly from './components/Hourly'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
        <Routes>
          <Route path="/" element={<FetchData2 />} />
          <Route path="/about" element={<FetchData />} />
          <Route path="/hourly" element={<Hourly/>}/>
        </Routes>
    </div>
  );
}

export default App;
