import React ,{useState} from 'react'
import axios from 'axios'
import '../styles/Albums.css'



export default function AlbumForm(props) {

    const [album, setAlbum] = useState('')
  


    const postAlbum=()=>{
        axios.post('https://jsonplaceholder.typicode.com/albums', {title:album} )
        .then(response=> {props.addAlbums(response.data) ; setAlbum('')
    }
        )
    
    

    }

    const handleChange=(e)=>{
        
        setAlbum(e.target.value)
      

    //    console.log(album) 
    }

    return (
        <div>
            <input name='album' placeholder='Enter your Albums'  onChange={handleChange} value={album}></input>
            <button className='addbtn'onClick={postAlbum}>+</button>
            <button className='cancelbtn' onClick={props.showFormFunc}>X</button>
        </div>
    )
}
