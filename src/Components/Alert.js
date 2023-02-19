import React from "react";

const Alert = (props) => {
  const capitalize = (str) => {
    if (str === "danger") {
      str = "Error";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div style={{ height: "55px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show mb-2`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong> {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
