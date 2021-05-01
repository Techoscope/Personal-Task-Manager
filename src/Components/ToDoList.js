import {React, Component} from 'react';
import axios from 'axios'
import '../styles/ToDoList.css'

class ToDoList extends Component{
    constructor(props){
        super(props)
        this.state ={
            toDos:[],
            hideAddForm: true,
            todoItem: ""
        }

    }
    componentDidMount(){
        this.toDosFetch()
    }

    toDosFetch=()=>{
        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.setState({
                toDos:json
            })
        })   
    }
    addItems =(e)=>{
        
    }

    deleteItems =(e)=>{
        fetch('https://jsonplaceholder.typicode.com/todos' + e.target.parentElement.id,{
            method: 'DELETE',
        });
        e.target.parentElement.remove();

    }

    handleAddForm = () => {
        this.setState({
            hideAddForm: !this.state.hideAddForm
        })
    }

    handleAddInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        axios.post("https://jsonplaceholder.typicode.com/todos", {title:this.state.todoItem})
        .then(resp=>{
            this.setState({
                toDos: [...this.state.toDos,resp.data]
            })
        })
    }

    completeItem =(e)=>{
        //alert('')
        // const item ={completed:e.target.checked ? 'line-through':'none'} 
    }
    
    render() {
        return (
            <div>
                <button type='button' onClick={this.handleAddForm} hidden={!this.state.hideAddForm}>Add</button>

                <div hidden={this.state.hideAddForm}>
                    <input type='text' name='todoItem' onChange={this.handleAddInput} value={this.state.todoItem}/>
                    <button onClick={this.handleAddForm}>Cancel</button>
                    <button onClick={this.addItems} onClick={this.handleSubmit}>Add</button>
                </div>

                <ul>
                    {this.state.toDos.map((item)=>{
                        return(
                           <li key={item.id} id={item.id}>
                           <input onClick={this.completed} type='checkbox'/>

                           {item.title}
                           <span onClick={this.deleteItems} className='deleteSpan'>Delete</span>
                           </li> 
                        )
                    })}
                </ul>
            </div>
        )
    }
}
export default ToDoList;