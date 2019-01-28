import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../logo.png';

const Header = () => {
  return (
    <header>
      <img
        className="logo"
        src={logo}
        alt="Gemnote logo" />
      <nav>
        <ul>
          <li>
            <Link to="/">Customers</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
