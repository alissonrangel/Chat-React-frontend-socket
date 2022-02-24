import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';

import './Messages.css';

type Message2 = {
  user: string,
  text: string
}

type Props = {
  messages: Message2[],
  name: string
}
const Messages = ({ messages, name }: Props) => (
  <ScrollToBottom className="messages">

    { // eslint-disable-next-line react/no-array-index-key
      messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)
}
  </ScrollToBottom>
);

export default Messages;
