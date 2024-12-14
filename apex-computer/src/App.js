import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SingleProductView from './pages/SingleProductView';
import Cart from './pages/Cart';
import SearchResults from './pages/SearchResults';
import MyProfile from './pages/MyProfile';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/singleProductView' element={<SingleProductView />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search-results' element={<SearchResults />} />
        <Route path='/my-profile/:userId' element={<MyProfile />} />
        <Route path='/Adm-Login_pg' element={<AdminLogin />} />
        <Route path='/Adm-panel_pg' element={<AdminPanel/>} />
      </Routes>
    </>
  );
}

export default App;
