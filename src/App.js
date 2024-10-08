import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Wordle from './components/Wordle';
import SpellingBee from './components/SpellingBee';
import Sudoku from './components/Sudoku';
import useSound from 'use-sound';


function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    handleSelectLogo()
  };

  // AUDIO-FX
  const [clickBtn] = useSound('/audio/click-btn.wav')
  const [clickLogo] = useSound('/audio/select-login-btn.wav')
  function handleSelectBTN() { clickBtn(); }
  function handleSelectLogo() { clickLogo(); }

  return (
    <UserProvider value={{ user, handleLoginSuccess, handleLogout }}>
      <Router>
        {/* Outer container to manage the layout */}
        <div className="min-h-screen flex flex-col bg-gray-100">
          {/* TOP VAR */}
          <nav className="bg-white shadow-lg lg:sticky lg:top-0 lg:bg-white lg:z-50">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex justify-between">
                <div className="flex space-x-7">
                  {/* LOGO */}
                  <div className="flex items-center py-4 px-2">
                    <Link to="/" className="font-bold text-xl" onClick={handleSelectLogo}>
                      <span className="text-orange-500 tracking-widest"> Word </span>
                      <span className='text-green-500 tracking-widest'> Games… </span>
                    </Link>
                  </div>
                  {/* MANUs */}
                  <div className="hidden md:flex items-center space-x-1">
                    <Link to="/" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300"
                      onClick={handleSelectBTN}
                    >
                      Home
                    </Link>
                    <Link to="/wordle" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300"
                      onClick={handleSelectBTN}
                    >
                      Wordle
                    </Link>
                    <Link to="/spelling-bee" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300"
                      onClick={handleSelectBTN}
                    >
                      Spelling Bee
                    </Link>
                    <Link to="/sudoku" className="py-4 px-2 text-gray-500 hover:text-green-500 transition duration-300"
                      onClick={handleSelectBTN}
                    >
                      Sudoku
                    </Link>
                  </div>

                </div>

                {/* LOGIN */}
                <div className="flex items-center space-x-3">
                  {user ? (
                    <>
                      <Link to="/profile" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Profile</Link>
                      <button onClick={handleLogout} className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={handleSelectBTN} className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link>
                      <Link to="/signup" onClick={handleSelectBTN} className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
          {/* MENU 2 for MOBILE-SIZE*/}
          <div className="md:hidden bg-white shadow-lg py-4 sticky top-0 bg-white z-50 shadow-md">
            <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
              <p>
                {/* <Link to="/" className="hover:text-green-500 transition duration-300">Home</Link> | */}
                <Link to="/wordle" className="hover:text-green-500 transition duration-300 mx-2">Wordle</Link> |
                <Link to="/spelling-bee" className="hover:text-green-500 transition duration-300 mx-2">Spelling Bee</Link> |
                <Link to="/sudoku" className="hover:text-green-500 transition duration-300 mx-2"> Sudoku</Link>
              </p>
            </div>
          </div>
          {/* DISPLAY_COMPONENTS */}
          <div className="flex-grow max-w-6xl m-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile user={user} onLogout={handleLogout}/>} />
              <Route path="/wordle" element={<Wordle />} />
              <Route path="/spelling-bee" element={<SpellingBee />} />
              <Route path="/sudoku" element={<Sudoku />} />
            </Routes>
          </div>
          {/* Footer */}
          <footer className="bg-white shadow-lg py-4">
            <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
              <p>&copy; {new Date().getFullYear()} Word World. All rights reserved.</p>
              <p>
                <Link to="/" className="hover:text-green-500 transition duration-300">Home</Link> |
                <Link to="/wordle" className="hover:text-green-500 transition duration-300 mx-2">Wordle</Link> |
                <Link to="/spelling-bee" className="hover:text-green-500 transition duration-300 mx-2">Spelling Bee</Link> |
                <Link to="/sudoku" className="hover:text-green-500 transition duration-300 mx-2"> Sudoku</Link>
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;