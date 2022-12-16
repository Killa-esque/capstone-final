import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css'
// global css
import './App.css'
// Config Router
import { BrowserRouter, Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

// Config redux
import { Provider } from 'react-redux';
import { store } from './redux/configStore';

// Pages
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile';
import Search from './Pages/Search/Search';
import Cart from './Pages/Cart/Cart';
import Detail from './Pages/Detail/Detail';
import Carts from './components/UI/Cart/Carts';

// Templates
import HomeTemplate from './templates/HomeTemplate';

// Config history
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path='' element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='detail' element={<Detail />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

