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
        axios.post("https://jsonplaceholder.typicode.com/users", this.state)
        .then(resp=>{
            console.log(resp.data);
            this.props.addUser(resp.data)
        })
    }
    
    render() {
        console.log(this.state)
        return (
            <div>
                <form>
                    <input onChange={this.handleChange} name="name" placeholder="name"></input>
                    <input onChange={this.handleChange} name="username" placeholder="username"></input>
                    <input onChange={this.handleChange} name="email" placeholder="email"></input>
                    <input onChange={this.handleChange} name="phone" placeholder="phone"></input>
                    <button onClick={this.props.handleClick} style={{color:'firebrick',}}><i class="fa fa-times" aria-hidden="true"></i></button>
                    <button onClick={this.handleSubmit} type="button"><i class="fa fa-check" aria-hidden="true"></i></button>
                </form>
            </div>
        )
    }
}
