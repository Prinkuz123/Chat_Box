import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
const socket=io.connect("http://localhost:5000")

function App() {
  const[userName,setUserName]=useState("")
  const[room,setRoom]=useState("")

  const joinRoom=()=>{
    if(userName!==""&& room!==""){

      socket.emit("join-room",room)
    }
  }

  return (
  
    <div className='main'>
    <input placeholder='Name' type="text" onChange={(evenet)=>{
      setUserName(evenet.target.value)
    }}/>
    <input placeholder='Room id' type="text" onChange={(evenet)=>{
      setRoom(evenet.target.value)
    }} />   
    <button onClick={joinRoom}>Join </button>
<Chat  userName={userName} room={room}/>
    </div>
  )
}

export default App
