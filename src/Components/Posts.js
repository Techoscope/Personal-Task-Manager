import React, { Component } from 'react';
import "../styles/Posts.css";


export default class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: []
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

    removePost = (e) => {
        const data = {
            method: "DELETE"
        }

        fetch("https://jsonplaceholder.typicode.com/posts" + e.target.parentElement.id, data);
        e.target.parentElement.remove()
    }

    render() {
        
        return (
            <div>
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








