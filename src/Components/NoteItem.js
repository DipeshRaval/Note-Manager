import React, { useContext } from "react";
import noteContext from "../Context/NoteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <>
      <div className="card col-md-3 mx-2 my-1">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="h5 fa-regular fa-trash-can"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
              <i
                className="mx-2 h5 fa-regular fa-pen-to-square"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
