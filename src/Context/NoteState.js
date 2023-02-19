import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const defaultNote = [];
  const [notes, setNotes] = useState(defaultNote);
  const host = "http://localhost:5000";

  const getAllNotes = async () => {
    const url = `${host}/note/getallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkZmJjNjE1NWIwYzQxZjNhYzViNzBmIn0sImlhdCI6MTY3NTYwNzE1NX0.8JX4MrrHZcKVDzpR20o2l8H15ZQrUpjWi6z1GqQKnGE",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    console.log("Add a new Note");
    //Api call remain
    const url = `${host}/note/create`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkZmJjNjE1NWIwYzQxZjNhYzViNzBmIn0sImlhdCI6MTY3NTYwNzE1NX0.8JX4MrrHZcKVDzpR20o2l8H15ZQrUpjWi6z1GqQKnGE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newNote = await response.json();
    setNotes(notes.concat(newNote));
  };

  const deleteNote = async (id) => {
    console.log("Delete a Note");
    //Api call remain
    const url = `${host}/note/del/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkZmJjNjE1NWIwYzQxZjNhYzViNzBmIn0sImlhdCI6MTY3NTYwNzE1NX0.8JX4MrrHZcKVDzpR20o2l8H15ZQrUpjWi6z1GqQKnGE",
      },
    });

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });

    setNotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    console.log("Update a Note");
    //Api call remain
    const url = `${host}/note/update/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkZmJjNjE1NWIwYzQxZjNhYzViNzBmIn0sImlhdCI6MTY3NTYwNzE1NX0.8JX4MrrHZcKVDzpR20o2l8H15ZQrUpjWi6z1GqQKnGE",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await res.json();
    console.log(json);

    const newNote = JSON.parse(JSON.stringify(notes));

    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if (element._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getAllNotes, addNote, editNote, deleteNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
