import React, { useEffect, useRef, useState } from 'react';
import socketClient from "socket.io-client";

import MessageTile from "../../components/MessageTile/MessageTile"
import "./Inbox.css"
const SERVER = "http://127.0.0.1:8080";

const Inbox = () => {
  const scrollRef = useRef();
  const [socket, setSocket] = useState();

  // for storing message list
  const [messages, setMessages] = useState([]);

  //for storing new message
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const socket = socketClient(SERVER);
    socket.on('connection', () => {
    });
    const addMessage = (msg) => {
      setMessages(prevMessages => [...prevMessages, msg])
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
      })

    };
    //event when we will get a message from another user
    socket.on('message', addMessage);
    setSocket(socket)
    return () => socket.emit('disconnect');
  }, [])





  const sendMessage = async (e) => {
    e.preventDefault();
    const messageRequestBody = { channel_id: 1, text: newMessage, senderName: socket.id, id: Date.now() }

    //send msg in a socket event to server
    socket.emit('send-message', messageRequestBody);

    //set empty to text box
    setNewMessage('')
  }

  return (<>
    <div className="Inbox">

      {messages && messages.map(msg => <MessageTile socketID={socket.id} key={msg.id} message={msg} />)}

      <span className="scroll-ref" ref={scrollRef}></span>

    </div>

    <form onSubmit={sendMessage}>
      <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type here" />
      <button type="submit" disabled={!newMessage}>
        <svg width="20px" height="20px" viewBox="0 0 24 24" ><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" fill="#0084ff"></path></svg>
      </button>
    </form>
  </>)
}
export default Inbox;