import React from "react";

const Message = ({ message }) => {
  return (
    <>
      <h1 className="message">{message.message}</h1>
      <p className="message">{message.response}</p>
    </>
  );
};

export default Message;
