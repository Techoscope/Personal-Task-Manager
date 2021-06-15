import React, { Component } from 'react'
import axios from "axios"

export default class Form extends Component {
    state = {
        name: "",
        username: "",
        email: "",
        phone: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit = () => {
        if(this.state.name!=="" && this.state.username!=="" && this.state.email!=="" && this.state.phone!==""){
            axios.post("https://jsonplaceholder.typicode.com/users", this.state)
            .then(resp=>{
                console.log(resp.data);
                this.props.addUser(resp.data);
                this.setState({ name : "" , username: "", email: "", phone: ""})
            })
        }
    }
    
    render() {
        //console.log(this.state)
        return (
            <div>
                <form>
                    <input onChange={this.handleChange} name="name" className="addInputs" placeholder="name" value={this.state.name}></input>
                    <input onChange={this.handleChange} name="username" className="addInputs" placeholder="username" value={this.state.username}></input>
                    <input onChange={this.handleChange} name="email" className="addInputs" placeholder="email" value={this.state.email}></input>
                    <input onChange={this.handleChange} name="phone" className="addInputs" placeholder="phone" value={this.state.phone}></input>
                    <button onClick={this.props.handleClick} style={{color:'firebrick',marginRight: "1%"}}><i className="fa fa-times addUserButtons" aria-hidden="true"></i></button>
                    <button onClick={this.handleSubmit} type="button"><i className="fa fa-check addUserButtons" aria-hidden="true"></i></button>
                </form>
            </div>
        )
    }
}
