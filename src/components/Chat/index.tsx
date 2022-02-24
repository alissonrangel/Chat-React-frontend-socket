import React, {
  MouseEvent, KeyboardEvent, useEffect, useState,
} from 'react';
// eslint-disable-next-line import/no-unresolved
import queryString from 'query-string';
import { io } from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar';
import Input from '../Input';
import Messages from '../Messages';

let socket: any;

const ENDPOINT = `${process.env.REACT_APP_BACKEND_URL}`;

type Props = {
  location: any
}

type Sala = {
  room: string,
  name: string,
}

type Message = {
  user: string,
  text: string
}

type User = {
  id: string,
  name: string,
  room: string
}

type Props2 = {
  room?: string,
  users: User[],
}

const Chat = ({ location }: Props) => {
  const [name2, setName2] = useState('');
  const [room2, setRoom2] = useState('');
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search) as Sala;

    socket = io(ENDPOINT);

    setRoom2(room);
    setName2(name);

    socket.emit('join', { name, room }, (error: any) => {
      if (error) {
        setErr(true);
        setErrMsg(error.error);
        setTimeout(() => {
          setErr(false);
          setErrMsg('');
        }, 4000);
      }
    });

    socket.on('connect_error', () => {
      let msgs2: Message[] = messages;
      const msg = {
        user: 'admin',
        text: 'Tentando reconectar...',
      };
      msgs2 = [...msgs2, msg];
      setMessages(msgs2);
    });

    socket.on('connect', () => {
      // eslintconst { name, room } = queryString.parse(location.search) as Sala;
      if (name !== '' && room !== '') {
        socket.emit('join', { name, room }, (error: any) => {
          if (error) {
            setErr(true);
            setErrMsg(error.error);
            setTimeout(() => {
              setErr(false);
              setErrMsg('');
            }, 4000);
          }
        });
      }
    });
    socket.on('disconnect', () => {
      let msgs3: Message[] = messages;
      const msg = {
        user: 'admin',
        text: 'Você foi desconectado...',
      };
      msgs3 = [...msgs3, msg];
      setMessages(msgs3);
      setUserList([]);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    let msgs = [];
    socket.on('message', (message0: Message) => {
      msgs = [...messages, message0];
      setMessages(msgs);
    });

    socket.on('roomData', ({ users }: Props2) => {
      // eslint-disable-next-line no-console
      console.log('USERs, ', users);

      setUserList(users);
    });
  }, [messages]);

  const sendMessage = (event: MouseEvent<HTMLInputElement> | KeyboardEvent) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room2} />
        <Messages messages={messages} name={name2} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <div className="userlist">
        { !err
          && (
          <h3>
            User List - Room:
            {' '}
            {room2}
          </h3>
          )}
        { err
          && (
            <h3>{errMsg}</h3>
          )}
        {userList.length > 0
      && userList.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
      </div>
    </div>
  );
};

export default Chat;