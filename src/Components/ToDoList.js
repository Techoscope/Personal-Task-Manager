import { getByTitle } from '@testing-library/dom';
import {React, Component} from 'react';
import '../styles/ToDoList.css'

class ToDoList extends Component{
    constructor(props){
        super(props)
        this.state ={
            toDos:[]
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
    completeItem =(e)=>{
        //alert('')
        const item ={completed:e.target.checked ? 'line-through':'none'}
        
        
    }
    
    render() {
        return (
            <div>
                <input type='text' />
                <button onClick={this.addItems}>Add</button>
              
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