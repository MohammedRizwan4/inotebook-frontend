import React from "react";
import NoteContext from "./noteContext";
import { useState } from 'react';

const NoteState = (props) => {

    const host = "https://inotebook-backend-amber.vercel.app";
    const initialNotes = [];

    const addNoteAlert = () => {
        props.showAlert("Added Successfully","success");
    }

    const updateNoteAlert = () => {
        props.showAlert("Updated Successfully","success");
    }

    const [notes, setNotes] = useState(initialNotes);

    //Add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log(json)
        setNotes(notes.concat(json))
    }

    //Get all notes
    const getAllNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        setNotes(json);
    }

    //delete a note
    const deleteNote = async (id) => {
        // TODO api Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        props.showAlert("Note Deleted Successfully","success")
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        props.showAlert("Note has been Deleted","danger");
        setNotes(newNotes)
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        //api Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        await response.json();

        let newwNotes = JSON.parse(JSON.stringify(notes));
        //logic to edit in client
        for (let index = 0; index < newwNotes.length; index++) {
            const element = newwNotes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
                break;
            }
        }
        setNotes(newwNotes)

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes ,addNoteAlert, updateNoteAlert}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;