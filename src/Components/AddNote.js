import React, { useContext, useState } from "react";
import noteContext from "../Context/NoteContext";

export default function AddNote() {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const clickHandle = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  const onChnage = (e) => {
    //add a value to existing note value(append)
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h3 className="my-2">Add a Note : </h3>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title :
          </label>
          <input
            type="text"
            className="form-control border border-dark border-1"
            id="exampleInputEmail1"
            onChange={onChnage}
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 ">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description :
          </label>
          <textarea
            className="form-control border border-dark border-1"
            id="exampleInputPassword1"
            cols="30"
            name="description"
            rows="5"
            value={note.description}
            onChange={onChnage}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag :
          </label>
          <input
            type="text"
            className="form-control border border-dark border-1"
            id="tag"
            onChange={onChnage}
            name="tag"
            value={note.tag}
            aria-describedby="emailHelp"
          />
        </div>
        <button
          disabled={note.description.length < 5 || note.title.length < 5}
          type="submit"
          onClick={clickHandle}
          className="btn btn-primary"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}
