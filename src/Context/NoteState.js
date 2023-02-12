import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const defaultNote = [
    {
      _id: "63dfc2f14b26bf217bc0ac2b",
      user: "63dfbc6155b0c41f3ac5b70f",
      title: "Note update",
      description: "My first Note",
      tag: "personal",
      date: "2023-02-05T14:53:37.606Z",
      __v: 0,
    },
    {
      _id: "63e3db7ed338371320b77a76",
      user: "63dfbc6155b0c41f3ac5b70f",
      title: "Note Dipesh",
      description: "Test 12",
      tag: "CLG",
      date: "2023-02-08T17:27:26.738Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(defaultNote);

  const addNote = async (title, description, tag) => {
    console.log("Add a new Note");
    //Api call remain
    const newNote = {
      _id: "63e3db7ed33c8371320b77a76",
      user: "63dfbc6155b0c41f3ac5b70f",
      title: title,
      description: description,
      tag: tag,
      date: "2023-02-08T17:27:26.738Z",
      __v: 0,
    };
    setNotes(defaultNote.concat(newNote));
  };

  const deleteNote = async (id) => {
    console.log("Delete a Note");

    //Api call remain

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  const updateNote = (id, title, description, tag) => {
    console.log("Update a Note");
    //Api call remain
    for (let i = 0; i < notes.length; i++) {
      const element = notes._id;
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
