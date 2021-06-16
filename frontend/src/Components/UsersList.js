import axios from 'axios';
import React,{Component} from 'react';
import Form from './Form';
import "../styles/UserList.css"

class UsersList extends Component {
  state = {
    users: [],
    clicked: false,
    editClick:true,
    name:'',
    username:'',
    email:'',
    phone:''
  } 

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  addUser = (param) => {
    this.setState({
      users: [...this.state.users,param]
    })
  }

  deleteUser = (e)=>{
    fetch('https://jsonplaceholder.typicode.com/users/' + e.target.parentElement.parentElement.id,{
      method:'DELETE'
    })
    e.target.parentElement.parentElement.remove();
    console.log(e.target.parentElement.parentElement.id);
  }

  editUser = (e)=>{
    for(let i=0; i<4; i++){
      e.target.parentElement.parentElement.children[i].children[0].disabled=false;
    }
    e.target.parentElement.parentElement.children[5].style.display='table-cell';
    this.setState({editClick:false})
    e.target.parentElement.parentElement.classList.add("highlightTDs")
  }

  handleUpdate =(e)=>{this.setState({[e.target.name] : e.target.value})}

  saveChanges=(e)=>{
    
    this.setState({editClick:true})
    e.target.parentElement.parentElement.classList.remove("highlightTDs")
    for(let i=0; i<4; i++){
      e.target.parentElement.parentElement.children[i].children[0].disabled=true;
    }
    e.target.parentElement.parentElement.children[4].style.display='none';

    let item ={}
    if(this.state.name !=="" || this.state.username !=="" || this.state.email !=="" || this.state.phone !==""){
      item = {name: this.state.name,username: this.state.username,email: this.state.email,phone: this.state.phone};
      this.setState({ name : "" , username: "", email: "", phone: ""})
    }
    if(item.name === ''){delete item.name}
    if(item.username === ''){delete item.username}
    if(item.email === ''){delete item.email}
    if(item.phone === ''){delete item.phone}

    axios.put('https://jsonplaceholder.typicode.com/users/' + e.target.parentElement.parentElement.id, item)
    .then(res =>{
      console.log(res.data)
      if((res.data.name)){this.setState({...this.state, users:this.state.users.filter((item)=>{
        return item.id == e.target.parentElement.parentElement.id ? item.name = res.data.name : item
      })})}

      if((res.data.username)){this.setState({...this.state, users:this.state.users.filter((item)=>{
        return item.id == e.target.parentElement.parentElement.id ? item.username = res.data.username : item
      })})}

      if((res.data.email)){this.setState({...this.state, users:this.state.users.filter((item)=>{
        return item.id == e.target.parentElement.parentElement.id ? item.email = res.data.email : item
      })})}

      if((res.data.phone)){this.setState({...this.state, users:this.state.users.filter((item)=>{
        return item.id == e.target.parentElement.parentElement.id ? item.phone = res.data.phone : item
      })})}

    })
  
 }

 cancelChanges=(e)=>{
  console.log(this.state)
  this.setState({editClick:true})
    e.target.parentElement.parentElement.classList.remove("highlightTDs")

  for(let i=0; i<4; i++){
    e.target.parentElement.parentElement.children[i].children[0].disabled=true;
  }
    e.target.parentElement.parentElement.children[4].style.display='none';
    
  if(this.state.name !=="" || this.state.username !=="" || this.state.email !=="" || this.state.phone !=="" ){
    e.target.parentElement.parentElement.children[0].children[0].value = this.state.users[e.target.id].name
    //console.log(e.target.parentElement.parentElement.id)
    e.target.parentElement.parentElement.children[1].children[0].value = this.state.users[e.target.id].username

    e.target.parentElement.parentElement.children[2].children[0].value = this.state.users[e.target.id].email

    e.target.parentElement.parentElement.children[3].children[0].value = this.state.users[e.target.id].phone
  }
  this.setState({name:"", username:"",email:"", phone:""})
  
}

  render() {
    if(this.state.users.length){
      return (
        <div className="userListing">
          <h1 className="allUsers">All Users List</h1>
          <button onClick={this.handleClick} className="addUserBtn">Add User</button>
          <div className="userForm">
            {this.state.clicked ? <Form handleClick={this.handleClick} addUser={this.addUser} /> : ""}
          </div>
          <table width="100%" className="usersTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
            { this.state.users.map((user,index) =>{
                    return (
                        <tr key ={user.id} id={user.id} >
                          <td><input type ="text" defaultValue={user.name} name ="name" onChange ={this.handleUpdate} className="name userInfos" disabled={true}/></td>
                          <td><input type ="text" defaultValue={user.username} name ="username" onChange ={this.handleUpdate} className="username userInfos" disabled={true}/></td>
                          <td><input type ="text" defaultValue={user.email} name ="email" onChange ={this.handleUpdate} className="email userInfos" disabled={true}/></td>
                          <td><input type ="text" defaultValue={user.phone} name ="phone" onChange ={this.handleUpdate} className="phone userInfos" disabled={true}/></td>
                      {this.state.editClick ?
                      <td ><span onClick={this.editUser} style={{color:'green'}}>edit</span>/<span onClick ={this.deleteUser} style={{color:'red'}}>delete</span></td>:''}

                      <td style={{display:'none'}}><span onClick={this.saveChanges} style={{color:'blue'}}>save</span>/<span onClick ={this.cancelChanges} style={{color:'firebrick'}} id={index}>cancel</span></td> 
                    </tr>)
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
