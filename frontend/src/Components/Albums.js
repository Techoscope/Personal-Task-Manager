import React, { Component } from 'react'
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
        console.log(param)
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
  }
    )
    }

    render() {
        
        return (
            <div>
             <h2>Albums List</h2>
             <button onClick={this.showFormFunc}>ADD ALBUMS</button>
             {this.state.showForm?  <AlbumForm showFormFunc={this.showFormFunc} addAlbums={this.addAlbums}/> : '' }
             
             <div className='album-container'>
             {this.state.albums.map((item,index) => {
                 return <a href= '#' className='container' key={index}>
                     {item.title}
                 </a>
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