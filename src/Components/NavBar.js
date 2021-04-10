import React from 'react';
import './NavBar.css';

class NavBar extends React.Component {
  render () {
    return (
      <header>
        <div className='brand'>PTM</div>
        <nav>
          <ul>
            <li><a href="#">Users List</a></li>
            <li><a href="#">Todo Lists</a></li>
            <li><a href="#">Posts</a></li>
            <li><a href="#">Albums</a></li>
          </ul>
        </nav>
        <div className='auth'><a href="#">Logout</a></div>
      </header>
    )
  }
}

export default NavBar;