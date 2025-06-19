import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import BubbleAnimation from './BubbleAnimation';
import './App.css';

function App() {
  return (
    <SnackbarProvider 
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={3000}
      style={{ fontFamily: '"Poppins", sans-serif' }}
    >
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<BubbleAnimation />} />
          </Routes>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
