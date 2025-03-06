import React, { useContext, useEffect } from 'react'
import noteContext from '../context/NoteContext'
import NoteItem from './NoteItem';

function Notes() {
    const {notes, getAllNotes, deleteNote, updateNote} = useContext(noteContext);

    useEffect(()=>{
        getAllNotes();
    },[])

    return (
        <div className='container my-3'>
            <h1>Notes</h1>
            <div className="row my-3">
                {notes.map((note) => {
                    return <NoteItem key = {note._id} note={note} deleteNote={deleteNote} updateNote={updateNote}/>
                })}
            </div>
        </div>
    )
}

export default Notes
