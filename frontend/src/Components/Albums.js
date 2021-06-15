import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Albums.css'
import AlbumForm from './AlbumForm';



 class Albums extends Component {
    constructor(props){
        super(props)

        this.state = {
            albums: [],
            showForm:false
        }
    }

    componentDidMount() {
        this.getAlbums()
    }

    showFormFunc=()=>{
        this.setState({
            showForm:!this.state.showForm

        })

    }

    addAlbums =(param)=>{

        this.setState({
            albums:[...this.state.albums, param]
        })
    }

    getAlbums = () => {
        fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => {
        //   console.log(json)
        return this.setState({albums: json})
        })
    }
    editFunc = (e) => {
        e.target.parentElement.style.display = "none"
        e.target.parentElement.nextElementSibling.nextElementSibling.style.display = "block";
        e.target.parentElement.nextElementSibling.contentEditable = true;
        e.target.parentElement.nextElementSibling.classList.add("highlightInputs")
        //console.log(e)
    }
    deleteAlbum = (e) => {
        const data = {
            method: 'DELETE',
        }
        
        fetch('https://jsonplaceholder.typicode.com/albums/' + e.target.parentElement.parentElement.id, data)
        .then(response => response.json())
        .then(jsonResponse => console.log(jsonResponse))
        e.target.parentElement.parentElement.remove();

        this.setState({oneClicked: !this.state.oneClicked});
    }
    showButtons = (e)=> {
        if(!this.state.oneClicked){
            e.target.previousElementSibling.style.display = "block";
            this.setState({oneClicked: !this.state.oneClicked});
            
            //console.log(e)
        }
    }
    saveChanges = (e) => {
        
        const updateInputValue = e.target.parentElement.previousElementSibling.innerHTML
        const parentID = parseInt(e.target.parentElement.parentElement.id);
       
        axios.put("https://jsonplaceholder.typicode.com/albums/" + parentID, { title: updateInputValue})
        .then( res => console.log(res.data) )
        .then(()=>{
            
            this.setState({...this.state, albums: this.state.albums.filter(item => {
                return item.id === parentID ? item.title = updateInputValue : item
            })});
           
        })
        .catch(err=>{console.log(err)});

        e.target.parentElement.previousElementSibling.contentEditable = false;
        e.target.parentElement.previousElementSibling.classList.remove("highlightInputs");
        e.target.parentElement.style.display = "none";
        this.setState({oneClicked: !this.state.oneClicked});
    }
    cancelChanges = (e) => {
        
        const indexNumber = e.target.parentElement.parentElement.id;
        e.target.parentElement.previousElementSibling.innerHTML = this.state.albums[indexNumber - 1].title; 
        e.target.parentElement.previousElementSibling.contentEditable = false;
        e.target.parentElement.previousElementSibling.classList.remove("highlightInputs");
        e.target.parentElement.style.display = "none";
        this.setState({oneClicked: !this.state.oneClicked});
    }

    render() {
        
        return (
            <div>
             <h1>Albums List</h1>
             <button onClick={this.showFormFunc} id="addButtonAlbums">ADD ALBUMS</button>
             {this.state.showForm?  <AlbumForm showFormFunc={this.showFormFunc} addAlbums={this.addAlbums}/> : '' }
             
             <div className='album-container'>
             {this.state.albums.map((item,index) => {
                 return (
                    <div className='container' key={index} id={item.id}>
                    <div className="albumBothButtons">
                        <span className="editAlbumBtn" onClick={this.editFunc}>Edit </span>|
                        <span className="deleteAlbumBtn" onClick={this.deleteAlbum}> Delete</span>
                    </div>
                    
                    <span className="albumItem" onClick={this.showButtons} contentEditable={false}>{item.title}</span>
                    <div className="secondAlbumButtons">
                        <button className="saveAlbumChanges" onClick={this.saveChanges}>Save</button>
                        <button className="cancelAlbumChanges" onClick={this.cancelChanges}>Cancel</button>
                    </div>
                </div>
                 )
             })}
             </div>
            

            </div>
        )
         
    }
}
    


export default Albums;





// <table>
// <tbody>
// <tr>
//     {/* <th>UserID</th> */}
//     <th>USER-ID</th>
//     <th>ID</th>
//     <th>TITLE</th>
// </tr>

// {this.state.albums.map((album) => {
//     return (
        
//         <tr key={album.id}>

//         {/* <td >{post.userId}</td> */}
//         <td >{album.userId}</td>
//         <td >{album.id}</td>
//         <td >{album.title}</td>

//     </tr>
    
   
//     )
// })}
// </tbody>
 

// </table>