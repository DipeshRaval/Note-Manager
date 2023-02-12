import React, { useContext } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../Context/NoteContext";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes } = context;

  return (
    <div className="container">
      <h3 className="my-3">Your Notes : </h3>
      <div className="row">
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              title={note.title}
              description={note.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
