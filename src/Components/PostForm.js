import React, { Component } from 'react'
import axios from "axios"

export default class Form extends Component {
    state = {
        title: "",
        body: ""
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.title]: e.target.value
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
                <h2>Create New Post</h2>
                {this.state.postClicked ? 
                <form>
                    <label>Title</label><br/>
                    <input id="inputTitle" type="text" placeholder ="Enter your title!"/><br/>
                    <label>Body</label><br/>
                    <input id="inputPost" type="text" placeholder = "Enter your post!" /><br/>
                    <button onClick={this.cancelPost} id="cancelPost">Cancel</button> 
                    <button onClick={this.addPost} id="savePost">Save</button>       
                </form> : null}
            </div>
        )
    }
}
