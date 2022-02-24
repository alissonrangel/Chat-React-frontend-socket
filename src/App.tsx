import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Join from './components/Join';
import Chat from './components/Chat';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat location={window.location} />} />
    </Routes>
  </BrowserRouter>
);

export default App;
