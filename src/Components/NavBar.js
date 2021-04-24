import React from 'react';
import '../styles/NavBar.css';
import {Link} from "react-router-dom";

class NavBar extends React.Component {
  render () {
    return (
      <header>
        <div className='brand'>PTM</div>
        <nav>
          <ul>
            <li><Link to="/">Users List</Link></li>
            <li><Link to="/todos">Todo Lists</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/albums">Albums</Link></li>
          </ul>
        </nav>
        <div className='auth'><a href="#">Logout</a></div>
      </header>
    )
  }
}

export default NavBar;