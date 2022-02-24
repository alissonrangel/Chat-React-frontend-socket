import React, { MouseEvent, KeyboardEvent } from 'react';

import './Input.css';

type Props = {
  // eslint-disable-next-line no-unused-vars
  setMessage: (message: string) => void,
  // eslint-disable-next-line no-unused-vars
  sendMessage: (e: MouseEvent<HTMLInputElement> | KeyboardEvent) => void,
  message: string
}

const Input = ({ setMessage, sendMessage, message }: Props) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    />
    <input type="submit" className="sendButton" onClick={(e) => sendMessage(e)} value="send" />
  </form>
);

export default Input;
