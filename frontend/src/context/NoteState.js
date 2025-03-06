import React, { useState } from 'react'
import NoteContext from './NoteContext';

function NoteState(props) {
  const url = "http://notebook.ap-south-1.elasticbeanstalk.com/notes"
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [notes, setNotes] = useState([]);

  const getAllNotes = async() => {
    const myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    const response = await fetch(`${url}/getnotes`, {
      method: "GET",
      headers: myHeaders,
    });
    const data = await response.json();
    setNotes(data);
  }

  const addNote = async(newNote) => {
    const myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json")
    const response = await fetch(`${url}/addnote`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(newNote)
    });
    const data = await response.json();
    setNotes(notes.concat(data))
  }

  const updateNote = async(note) => {
    const myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json")
    const response = await fetch(`${url}/updatenote/${note._id}`, {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(note)
    });
    const data = await response.json();
    const updatedNotes = notes.map((note) => {
      return note = note._id === data._id ? data : note;
    })
    setNotes(updatedNotes);
  }

  const deleteNote = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json")
    const response = await fetch(`${url}/deletenote/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    });
    if(response.ok){
      const updatedNotes = notes.filter((note) => {
        return note._id !== id
      })
      setNotes(updatedNotes);
    }
  }


  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, getAllNotes, deleteNote, updateNote, token, setToken }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
