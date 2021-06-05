import React, { Component } from 'react';
import "../styles/Posts.css";
import axios from 'axios'

export default class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            title:'',
            body:''

        }
    }

    fetchPosts = () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(jsonResponse => {
            this.setState({
                posts: jsonResponse
            })
        })
    }
    componentDidMount(){
        this.fetchPosts()
    }
     handleInput = (e) => {
 this.setState({[e.target.name]:e.target.value})
     }
    removePost = (e) => {
        const data = {
            method: "DELETE"
        }

        fetch("https://jsonplaceholder.typicode.com/posts" + e.target.parentElement.id, data);
        e.target.parentElement.remove()
    }
    handleClick=()=>{
        axios.post("https://jsonplaceholder.typicode.com/posts", {title:this.state.title,body:this.state.body})
        .then(resp=>{
           this.setState({posts:[...this.state.posts,resp.data]})
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <label>TITLE</label>
                <br/>
                <input type='text' name='title'value={this.state.title} 
                 onChange={this.handleInput}/>
                <br/>
                <label>BODY</label>
                <br/>
                <input type='text' name='body' value={this.state.body} onChange={this.handleInput} />
                <br/> <br/>
                <button onClick={this.handleClick}>Add</button>
                <button>Cancel</button>
                {this.state.posts.map((item,index)=>{
                    return (
                        <div className="postItems" id={item.id} key={index}>
                            <h3 key={index}>{item.title}</h3>
                            <span id="removeSpan" onClick={this.removePost}>Delete</span>
                            <p>{item.body}</p>
                            

                            <hr />
                        </div>
                        
                    )
                })}
            </div>
        )
    }
}








