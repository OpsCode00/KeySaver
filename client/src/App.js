import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import { RequireAuth } from './components/RequireAuth';
import Home from "./main/Home";
import Login from "./main/Login";
import SignUp from './main/SignUp';
import { AuthProvider, useAuth } from './utils/auth';
import Cookies from 'js-cookie';
import { RequireLogin } from './components/RequireLogin';
import { BrowserRouter } from 'react-router-dom';


function App() {
  const auth = useAuth();

  React.useEffect(() => {
    const user = Cookies.get("KeySaver");
    if(user) auth.login(user)
  })
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<RequireAuth> <Home /> </RequireAuth>} />
          <Route path="/" element={<RequireLogin> <Login /> </RequireLogin>} />
          <Route path="/registration" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;