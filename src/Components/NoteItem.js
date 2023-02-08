import React from "react";

const NoteItem = (props) => {
  return (
    <>
      <div className="card col-md-3 my-1 mx-2">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
