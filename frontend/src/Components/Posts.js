import React, { Component, createRef } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "../styles/Posts.css";

export default class Posts extends Component {
    constructor(props){
        super(props);
        this.titleRef = createRef();
        this.bodyRef = createRef();
        this.succesfulRef = createRef();
        this.state = {
            posts: [],
            editClick:true,
            postClicked: false,
            title: "",
            body: ""
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

        fetch("https://jsonplaceholder.typicode.com/posts/" + e.target.parentElement.parentElement.id, data)
        .then(res => res.json())
        .then(jsonRes => {
            console.log(jsonRes);
            e.target.parentElement.parentElement.remove(); 
        })
        
    }
    
    editPost =(e)=>{
        console.log(e)

    }

    createPost = () => {
        this.setState ({postClicked: !this.state.postClicked})
    }
    // Todo: create addPost and cancelPost method
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    cancelPostAdding = () => {
        this.setState ({postClicked: !this.state.postClicked})
    };
    addPostFunc = () => {
        let item = {title: this.state.title, body:this.state.body};
        
        if(item.title === ""){
            this.titleRef.current.style.display = "inline-block";
        } else if(item.body === ""){
            this.bodyRef.current.style.display = "inline-block";
        } else {
            axios.post("https://jsonplaceholder.typicode.com/posts", item)
            .then(res => {
                console.log(res.data);
                //dispatch({type: "addPost", payload: res.data});
                this.setState({posts: [...this.state.posts, res.data], input: "", body:""});
                this.titleRef.current.style.display = "none"
                this.bodyRef.current.style.display = "none";
                this.succesfulRef.current.style.display = "inline-block";
                setTimeout(()=>{
                    this.succesfulRef.current.style.display = "none";
                },2000)
            })
            .catch(err=>{console.log(err)})
        }  
    }

    render() {
        //console.log(this.state)
        return (
            <div>
                <h1 style={{margin: "1% 3%"}}>All Posts</h1>
                <button id="createPostBtn" onClick ={this.createPost}> Create Post </button>

                {this.state.postClicked ? 
                <div id="postsForm">
                <label htmlFor="title">Title</label><br />
                <input placeholder="Enter your title!" id="titleInput" name="title" onChange={this.handleChange} value={this.state.title}/> <span id="titleRequire" className="requires" ref={this.titleRef}>*required</span> 
                <br />

                <label htmlFor="body">Body</label><br />
                <input placeholder="Enter your post!" id="bodyInput" name="body" onChange={this.handleChange} value={this.state.body}/> <span id="bodyRequire" className="requires" ref={this.bodyRef}>*required</span> 
                <br />

                <button onClick={this.cancelPostAdding} id="cancelPostButton">Cancel</button>
                <button onClick={this.addPostFunc} id="savePostButton">Save</button>
                <span id="userSuccesful" ref={this.succesfulRef}>Succesfully added!</span>
            </div>: ""}
                <div>
                    {this.state.posts.map((item,index)=>{
                        return (
                            <div className="postContainer" id={item.id} key={index}>
                                <h3 key={index} className="postTitle">{item.title}</h3>
                                
                                <span className="removeSpan">

                                    <i className="fas fa-trash trashPostIcons" onClick={this.removePost}></i>
                                    <Link to={`/posts/${item.id}`}><i className="fas fa-pen editPostIcons"></i></Link>
                                    
                                </span>
                                <p className="postBody">{item.body}</p>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}








