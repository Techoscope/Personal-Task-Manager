import React, { Component } from 'react';
import PostForm from "./PostForm"
import "../styles/Posts.css";


export default class Posts extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            editClick:true,
            postClicked: false
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

        fetch("https://jsonplaceholder.typicode.com/posts" + e.target.parentElement.parentElement.id, data);
        e.target.parentElement.parentElement.remove()
    }
    
    editPost =(e)=>{
        console.log(e)

    }

    createPost = () => {
        this.setState ({postClicked: !this.state.postClicked})
      }

    addPost = () =>{

    }

    cancelPost =(e) =>{
       
    }


    render() {
        
        return (
            <div>
                <h2>All Posts</h2>
                <button id="createPostBtn" onClick ={this.createPost}> Create Post </button>
                {this.state.postClicked ? 
                <form>
                    <label>Title</label><br/>
                    <input id="inputTitle" type="text" placeholder ="Enter your title!"/><br/>
                    <label>Body</label><br/>
                    <input id="inputPost" type="text" placeholder = "Enter your post!" /><br/>
                    <button onClick={this.cancelPost} id="cancelPost">Cancel</button> 
                    <button onClick={this.addPost} id="savePost">Save</button>       
                </form> : null}

                {this.state.posts.map((item,index)=>{
                    return (
                        <div className="postitems" id={item.id} key={index}>
                            <h3 key={index}>{item.title}</h3>
                            {/* <span id="removeSpan" onClick={this.removePost}>Delete</span> */}
                            <span>
                            <i className="fas fa-trash" id="removeSpan" onClick={this.removePost}></i>
                            <i className="fas fa-pen" id="editSpan" onClick={this.editPost}></i>
                            </span>
                            <p>{item.body}</p>
                            <hr />
                        </div> 
                    )
                })}
            </div>
        )
    }
}








