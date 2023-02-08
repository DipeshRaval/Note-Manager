import React, { useContext, useEffect } from "react";
import noteContext from "../Context/NoteContext";

const About = () => {
  const obj = useContext(noteContext);

  useEffect(() => {
    obj.update();
    // eslint-disable-next-line
  }, []);

  return (
    <h1>
      Name : {obj.state.name} and Branch : {obj.state.Branch}
    </h1>
  );
};

export default About;
