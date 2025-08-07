import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import api from './api';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import DoctorList from './components/DoctorList';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await api.get('/users/me/');
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('access')) fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={() => setUser(null)} />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={user ? <DoctorList /> : <LoginForm onLogin={fetchUser} />}
          />

          <Route
            path="/appointments"
            element={user ? <AppointmentList /> : <Navigate to="/" />}
          />
          <Route
            path="/book/:doctorId"
            element={user ? <AppointmentForm /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
