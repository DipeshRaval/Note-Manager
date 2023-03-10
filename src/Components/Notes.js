import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import NoteContext from "../Context/NoteContext";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  const navigator = useNavigate();
  const { showAlert } = props;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllNotes();
    } else {
      navigator("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);

  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note._id,
      etitle: note.title,
      edescription: note.description,
      etag: note.tag,
    });
  };

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const clickHandle = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Note updated Successfully", "success");
  };

  const onChnage = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <AddNote showAlert={showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    name="etitle"
                    value={note.etitle}
                    minLength={5}
                    required
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
                    name="edescription"
                    rows="5"
                    minLength={5}
                    required
                    value={note.edescription}
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
                    id="etag"
                    value={note.etag}
                    onChange={onChnage}
                    name="etag"
                    aria-describedby="emailHelp"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                disabled={
                  note.edescription.length < 5 || note.etitle.length < 5
                }
                onClick={clickHandle}
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3 className="my-3">Your Notes : </h3>
      <div className="container">
        {notes.length === 0 && "No notes added yet"}
      </div>
      <div className="row">
        {notes.map((note) => {
          return (
            <NoteItem
              note={note}
              showAlert={showAlert}
              updateNote={updateNote}
              key={note._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
