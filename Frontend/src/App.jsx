import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import './App.css';

import AIGenerationInterface from './component/AIGenerationInterface'
const App = () => {
  return (
    <Router classname='app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-generation" element={<AIGenerationInterface />} />
      </Routes>
    </Router>
  );
}


export default App
