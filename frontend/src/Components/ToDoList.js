import React,{Component} from 'react';
import axios from "axios"
import '../styles/ToDoList.css'

class ToDoList extends Component{
    constructor(props){
        super(props)
        this.state ={
            todos:[],
            input: "",
            editClick: false,
            updateInputValue: "",
            oneClickEdit : false
        }

    }
    componentDidMount(){
        this.toDosFetch()
    }

    toDosFetch=()=>{
        fetch('http://localhost:8080/api/todos')
        .then(response => response.json())
        .then(json => {
            //console.log(json)
            this.setState({
                todos:json
            })
        })   
    }
    addItems =(e)=>{
        if(this.state.input){
            axios.post("http://localhost:8080/api/todos", {title: this.state.input})
            .then(response => {
                console.log(response.data)
                this.setState({
                    todos: [...this.state.todos, response.data],
                    input: ""
                });
                e.target.previousElementSibling.style.display = "none";
                e.target.nextElementSibling.style.display = "inline-block";
                setTimeout(()=>{
                    e.target.nextElementSibling.style.display = "none";
                },2000)
        })
        } else {
            e.target.previousElementSibling.style.display = "inline-block"
        }
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    deleteItems =(e)=>{
        const data = {
            method: 'DELETE',
        }
        
        fetch('https://jsonplaceholder.typicode.com/todos/' + e.target.parentElement.parentElement.id, data)
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse)
            e.target.parentElement.parentElement.remove();
        })
        

    }
    completeItem =(e)=>{
        // if condition is written in the inline CSS!!

        if(e.target.checked){
            axios.put("http://localhost:8080/api/todos/" + e.target.parentElement.id, {completed: e.target.checked})
            .then(res => {
                console.log(res.data);
                e.target.checked = true;
                e.target.parentElement.querySelector(".todoItems").style.textDecoration = e.target.checked ? 'line-through' : 'none';
            })
        } else {
            axios.put("http://localhost:8080/api/todos/" + e.target.parentElement.id, {completed: e.target.checked})
            .then(res => {
                console.log(res.data);
                e.target.checked = false;
                e.target.parentElement.querySelector(".todoItems").style.textDecoration = e.target.checked ? 'line-through' : 'none';
            })
        }
        
        
    }

    editTodos = (e) => {
        // console.log(this.state)

        if(!this.state.oneClickEdit){
            e.target.parentElement.parentElement.children[1].readOnly = false
            e.target.parentElement.parentElement.children[1].classList.add("highlightInputs");


            this.setState({editClick: true, oneClickEdit: !this.state.oneClickEdit});
            e.target.parentElement.classList.add("hideClassName")
            e.target.parentElement.parentElement.children[3].classList.add("showClassName")
        }
         
    }

    cancelChanges = (e)=> {

        //console.log(e.target.parentElement.previousElementSibling.previousElementSibling)

        if(this.state.updateInputValue !== ""){
            e.target.parentElement.previousElementSibling.previousElementSibling.value = this.state.todos[e.target.parentElement.parentElement.id-1].title;
        }
        

        e.target.parentElement.parentElement.children[1].readOnly = true;
        e.target.parentElement.parentElement.children[3].classList.remove("showClassName");
        e.target.parentElement.parentElement.children[2].classList.remove("hideClassName");
        e.target.parentElement.parentElement.children[1].classList.remove("highlightInputs");
        //console.log(e.target.parentElement.parentElement.children[2])

        this.setState({oneClickEdit: !this.state.oneClickEdit})

    }

    saveChanges = (e) => {
        const parentID = parseInt(e.target.parentElement.parentElement.id);
        if(this.state.updateInputValue !== ""){
            axios.put("https://jsonplaceholder.typicode.com/todos/" + e.target.parentElement.parentElement.id, { title: this.state.updateInputValue})
            .then( res => console.log(res.data) )
            .then(()=>{
                this.setState({...this.state, todos: this.state.todos.filter(item => {
                    return item.id == e.target.parentElement.parentElement.id ? item.title = this.state.updateInputValue : item
                })});
                this.setState({updateInputValue: "", oneClickEdit: !this.state.oneClickEdit});
            })
        } else {
            this.setState({updateInputValue: "", oneClickEdit: !this.state.oneClickEdit});
        }
        
        e.target.parentElement.parentElement.children[1].readOnly = true;
        e.target.parentElement.parentElement.children[1].classList.remove("highlightInputs");
        e.target.parentElement.parentElement.children[3].classList.remove("showClassName");
        e.target.parentElement.parentElement.children[2].classList.remove("hideClassName")
    }

    handleUpdate = (e) => {

        this.setState({
            updateInputValue: e.target.value
        })
    }
    
    render() {
        return (
            <div>
                <label style={{fontSize: "25px", fontWeight:"bold"}}>To Do List</label>
                <br/>
                <input name="input" id="todo_input" value={this.state.input} onChange={this.handleChange} placeholder="Enter your item!"></input>
                <span id="usernameRequire" className="requires">*required</span>
                <button onClick={this.addItems} className="addButtonToDoList">Add</button>
                <span id="userSuccesful">Succesfully added!</span>
              
                <ul className="toDoListUL">
                    {this.state.todos.map((item, index)=>{
                        return(
                           <li key={index} id={item.id} className="todosList">
                           <input onClick={this.completeItem} type='checkbox' checked={item.completed}/>

                           <input type="text" defaultValue={item.title} className="todoItems" readOnly={true} onChange={this.handleUpdate} style={{textDecoration: item.completed ? "line-through" : "none"}}/> 

                           <span>
                                <i className="fas fa-pen editIcons" onClick={this.editTodos}></i>
                                <i className="fas fa-trash trashIcons" id="deleteSpan" onClick={this.deleteItems}></i>
                            </span>

                            <span className="iconsToEdit">
                                <i className="far fa-check-circle checkIcons" onClick={this.saveChanges}></i>
                                <i className="fas fa-times-circle cancelIcons" onClick={this.cancelChanges}></i>
                            </span>

                           
                           </li> 
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default ToDoList;