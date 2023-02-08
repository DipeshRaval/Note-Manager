import React, { useContext } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../Context/NoteContext";

const Home = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes } = context;
  return (
    <div className="container col-md-8 my-3">
      <h3 className="my-2">Add a Note : </h3>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Title :
          </label>
          <input
            type="text"
            className="form-control w-75 border border-dark border-1"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3 ">
          <label for="exampleInputPassword1" className="form-label">
            Description :
          </label>
          <textarea
            className="form-control w-75 border border-dark border-1"
            id="exampleInputPassword1"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <h3 className="my-3">Your Notes : </h3>
      <div className="row">
        {notes.map((note) => {
          return <NoteItem title={note.title} description={note.description} />;
        })}
      </div>
    </div>
  );
};

export default Home;
