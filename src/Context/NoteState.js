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

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
