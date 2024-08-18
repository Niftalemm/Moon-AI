// Need update

'use client'
import { Box, Stack } from "@mui/material";
import { Assistant, Content } from "next/font/google";
import Image from "next/image";
import {useState} from 'react';

export default function Home() {
  const [messages, setMessages] = useState([{
    role: "assistant",
    Content: "Hi I'm the AI assistant. How can I help you today?"
  }]);

  const [message, setMessage] = useState('')

  return(
    <Box>
    <div>
      <h1>Chat with the AI Assistant</h1>
      <div>
        <div>
          <p>{messages.Content}</p>
        </div>
        <div>
          <input type="text" />
          <button>Send</button>
        </div>
      </div>
    </div>
    <Stack
      direction="column"
      width = "600px"
      height = "700px"
      border = "1px solid black"
      p = {2}
      spacing={2}
    >
      <Stack 
      direction={"column"} 
      spacing={2}
      flexGrow={1}
      overflow={"auto"} 
      maxHeight={"100%"}
      >

        {messages.map((message, index) => (
        <Box 
          key={index}  
          display = 'flex' 
          justifyContent = {
            message.role === 'assistant' ? 'flex-start' : 'flex-end'
          }
        >
        <Box
          bgcolor={
            message.role === 'assistant' ? 'primary.main' : 'secondary.main'
          }
          color='white'
          borderRadius={16}
          p={1}
          >
            {message.Content}
        </Box>
        </Box>
        
        ))}
      </Stack>
    </Stack>
    </Box>
  )
}
