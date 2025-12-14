import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import NavHeader from "./components/NavHeader";
import NotFound from './components/NotFoundComponent';
import { LoginForm } from './components/AuthComponents';
import API from './API.mjs';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import GoalsPage from './pages/GoalsPage';
import './App.css';
import Background from './components/Background';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  // controlla se l'utente è loggato
  // viene eseguito solo al primo render
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await API.getUserInfo();
        if (user) {
          setLoggedIn(true);
          setUser(user);
        } else {
          setLoggedIn(false);
          setUser('');
        }

      } catch (err) {
        // non sono autenticato
        console.log(err);
        setLoggedIn(false);
        setUser('');
      }
    };
    checkAuth();
  }, []);

  // funzione per gestire il login
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Benvenut*, ${user.name}!`, type: 'success' });
      setUser(user);
    } catch (error) {
      console.log(error);
      setMessage({ msg: error.message, type: 'danger' });
    }
  };

  // funzione per gestire il logout
  const handleLogout = async () => {
    try {
      await API.logOut();
      setLoggedIn(false);
      setUser('');
      setMessage({ msg: `Disconnessione avvenuta con successo!`, type: 'success' });
    } catch (error) {
      console.log(error);
      setMessage({ msg: error.message, type: 'danger' });
    };
  };

  return (
    <Routes>
      <Route element={<>
        <NavHeader loggedIn={loggedIn} handleLogout={handleLogout} />
        <Container fluid className='mt-3'>
          {message && <Row className="justify-content-center">
            <Alert variant={message.type} onClose={() => setMessage('')} dismissible className="w-75">{message.msg}</Alert>
          </Row>}
          <Outlet />
          <Background />
        </Container>
      </>
      }>

        <Route index element={<HomePage user={user} />} />

        <Route path="/play" element={<GamePage setMessage={setMessage} user={user} />} />

        <Route path="/goals" element={<GoalsPage setMessage={setMessage} user={user} />} />

        <Route path="*" element={<NotFound />} />
        <Route path='/login' element={
          loggedIn ? <Navigate replace to='/' /> : <LoginForm login={handleLogin} />
        } />
      </Route>

    </Routes>
  );

}

export default App;
