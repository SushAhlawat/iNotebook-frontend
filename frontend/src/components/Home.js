import React, { useContext, useState } from 'react'
import noteContext from '../context/NoteContext'

function Home() {
    const {addNote} = useContext(noteContext);
    const [note, setNote] = useState({"title": "", "description": "", "tag": ""});
    const addNewNote = (e) => {
        e.preventDefault();
        addNote(note);
        setNote({"title": "", "description": "", "tag": ""})
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }
    return (
        <div className="container my-3">
            <h1>Add Note</h1>
            <form className='my-3'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange= {onChange} value = {note.title} placeholder="Title" />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" className="form-control" id="description" name="description" rows="5" value = {note.description} onChange= {onChange} placeholder="Add Description" />
                </div>
                <button type="submit" className="btn btn-dark" onClick={addNewNote}>Add Note</button>
            </form>
        </div>
    )
}

export default Home
