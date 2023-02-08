import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const obj = {
    name: "Dipesh",
    Branch: "CE",
  };

  const [state, setstate] = useState(obj);
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "ABhay",
        Branch: " civil",
      });
    }, 2000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
