import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  return (
    <div className="container col-md-8 my-3">
      <AddNote />
      <Notes />
    </div>
  );
};

export default Home;
