import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import Layout from './components/Layout';
import Login from './components/Login';
import Home from './components/Home';
import ReqForm from './components/ReqForm';
import ChangePassword from './components/features/ChangePassword';




function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<UserList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/reqform" element={<ReqForm/>} />
          <Route path="/home/change-password" element={<ChangePassword/>}/>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

