import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getAllNotes, editNote ,updateNoteAlert} = context;

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes();
        }
        else{
            navigate('./login');
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: '', edescription: '', etag: '' });

    const updateNote = (currentNode) => {
        ref.current.click();
        setNote({ id: currentNode._id, etitle: currentNode.title, edescription: currentNode.description, etag: currentNode.tag });
    }
    const handleClick = (e) => {
        editNote(note.id,note.etitle,note.edescription,note.etag)
        updateNoteAlert();
        refClose.current.click();
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" minLength={5} required value={note.etitle} id="etitle" aria-describedby="emailHelp" onChange={onchange} name="etitle" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label" >Description</label>
                                    <input type="text" className="form-control" minLength={5} required value={note.edescription} id="edescription" name='edescription' onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" minLength={5} value={note.etag} id="etag" name='etag' onChange={onchange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" disabled={(note.etitle.length < 5) || (note.edescription.length<5)} onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Notes</h2>
                <div className="container mx-2">
                {
                    notes.length === 0 && 'No notes to display'
                }   
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                    })
                }
                </div>
        </>
    );
}

export default Notes;
