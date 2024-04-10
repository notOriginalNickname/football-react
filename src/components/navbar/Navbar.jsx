import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';


const Navbar = () => (
  <nav className='navbar'>
    <NavLink className='site-name' exact="true" to='/react-app'>Football Zone</NavLink>

    <ul className='nav-ul'>
      <li className='nav-li'><NavLink exact="true" to='/react-app'>Лиги / Соревнования</NavLink></li>
      <li className='nav-li'><NavLink exact="true" to='/teams'>Команды</NavLink></li>

    </ul>

  </nav>

);

export default Navbar;
