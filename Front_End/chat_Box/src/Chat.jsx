import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import io from 'socket.io-client'

const socket=io.connect("http://localhost:5000")



function Chat ({userName,room})  {
    const[currentMessage,setCurrentMessage]=useState("")
 
 const sendMessage=async ()=>{
     if(currentMessage!==""){
        const messageData={
            room:room,
            userName:userName,
            message:currentMessage,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        };
        console.log("Sending message:",messageData);
        await socket.emit("send_message",messageData)

    }

    // console.log("uswernamw",userName);
    // console.log("ryoom",room);
    // console.log(currentMessage);
 }
 useEffect(()=>{
    socket.on("receive_message",(data)=>{
      console.log("Received message:", data);  
    })
     
 },[socket])
    return (
    <div>
    <div className="head">
    <p>LiveChat</p>
    </div>
    <div className="body"></div>
    <div className="footer">
    <input type="text" placeholder="Type here" onChange={(e)=> setCurrentMessage(e.target.value)}/>
    <button onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
    </div>
    </div>
  )
}

export default Chat
