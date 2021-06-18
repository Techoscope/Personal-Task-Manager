import React ,{useState} from 'react'
import axios from 'axios'
import '../styles/AlbumForm.css'



export default function AlbumForm(props) {

    const [album, setAlbum] = useState('')
  


    const approveAddAlbum=(e)=>{
        if(album !== ""){
            axios.post('http://localhost:8080/api/albums', {title:album})
            .then(response => {
                console.log(response.data)
                props.addAlbums(response.data);
                setAlbum('');

                e.target.nextElementSibling.style.display = "inline-block";
                e.target.previousElementSibling.previousElementSibling.style.display = "none"
                setTimeout(()=>{
                    e.target.nextElementSibling.style.display = "none";
                },2000)
            })
        } else {
            e.target.previousElementSibling.previousElementSibling.style.display = "inline-block"
        }

        // axios.post('https://jsonplaceholder.typicode.com/albums', {title:album} )
        //     .then(response=> {props.addAlbums(response.data) ; setAlbum('')})
        //     .catch(err=>{console.log(err)})
    }

    const handleChange=(e)=>{
        
        setAlbum(e.target.value);

    }


    return (

        <div className="addAlbumDiv">
            <input name="album" id="albumInput" value={album} onChange={handleChange} placeholder="Enter your item!"></input>
            <span id="albumRequire">*required</span>

            <i className="fas fa-window-close cancelAlbumAdd" onClick={props.showFormFunc}></i>
            <i className="fas fa-check-square approveAlbumAdd" onClick={approveAddAlbum}></i>

            <span id="albumSuccesful">Succesfully added!</span>
        </div>

        // <div>
        //     <input name='album' placeholder='Enter your Albums'  onChange={handleChange} value={album}></input>
        //     <button className='addbtn'onClick={postAlbum}>+</button>
        //     <button className='cancelbtn' onClick={props.showFormFunc}>X</button>
        // </div>
    )
}
