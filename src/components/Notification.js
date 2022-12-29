import React from "react";

function Notification({ message }) {
  if (message === null) {
    return null;
  }
  return (
    <p
      className="error"
      style={message.includes("Added") ? { color: "green" } : { color: "red" }}
    >
      {message}
    </p>
  );
}

export default Notification;
