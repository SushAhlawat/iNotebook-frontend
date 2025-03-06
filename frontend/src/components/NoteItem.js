import React, { useEffect, useState } from 'react'

function NoteItem(props) {
    const { note, deleteNote, updateNote } = props;

    const [updatedNote, setUpdatedNote] = useState({title:"", description:"", tag:""});

    const removeNote = () => {
        deleteNote(note._id);
    }

    const saveNote = () => {
        updateNote(updatedNote);

    }
    const onChange = (e) => {
        setUpdatedNote({...updatedNote, [e.target.name]:e.target.value});
    }
    const openModal = () => {
        console.log("updatedNote"+ note.description);
        //setUpdatedNote(note);
    }

    useEffect(()=>{
        setUpdatedNote({...note});
    },[note])

    return (
        <>
            <div className='col-md-3 my-3'>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-dark mx-2" data-toggle="modal" data-target={`#modal-${note._id}`} onClick={openModal}>Update</button>
                            <button type="button" className="btn btn-danger" onClick={removeNote}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={`modal-${note._id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value = {updatedNote.title} placeholder="title" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="text" className="form-control" id="description" name="description" rows="5" value = {updatedNote.description} onChange={onChange} placeholder="description" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={saveNote}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
