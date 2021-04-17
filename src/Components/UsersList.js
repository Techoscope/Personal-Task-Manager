import React from 'react';

class UsersList extends React.Component {
  state = {
    users: []
  }
  
  render() {
    if(this.state.users.length){
      return (
        <div>
          <h2>All Users List</h2>
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
    }
    return <div>There is no users exist</div>
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        this.setState({
          users: json
        })
    })
  }
}

export default UsersList;
