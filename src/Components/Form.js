import React, { Component } from 'react'

export default class Form extends Component {
    state = {
        firstname: "",
        username: "",
        email: "",
        phone: ""
    }

    handleChange = (e) => {
        //console.log(e)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <form>
                    <input onChange={this.handleChange} name="firstname" placeholder="firstname"></input>
                    <input onChange={this.handleChange} name="username" placeholder="username"></input>
                    <input onChange={this.handleChange} name="email" placeholder="email"></input>
                    <input onChange={this.handleChange} name="phone" placeholder="phone"></input>
                    <button>-</button>
                    <button>+</button>
                </form>
            </div>
        )
    }
}
