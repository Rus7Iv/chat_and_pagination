import React, { useState } from 'react'
import styled from 'styled-components'

interface Message {
  text: string
  isMine: boolean
}

const initialMessages: Message[] = [
  { text: '1 message', isMine: true },
  { text: '2 message', isMine: false },
  { text: '3 message', isMine: true }
]

const ChatContainer = styled.div`
  width: 400px;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`

const ChatLog = styled.div`
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
`

const ChatMessage = styled.div<{ $isMine: boolean }>`
  background-color: ${props => (props.$isMine ? '#cce4ff' : '#eaeaff')};
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
  align-self: ${props => (props.$isMine ? 'flex-end' : 'flex-start')};
  max-width: 80%;
`

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ChatInput = styled.input`
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`

const ChatButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState<string>('')

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = { text: input, isMine: true }
      setMessages([...messages, newMessage])
      setInput('')
    }
  }

  return (
    <ChatContainer>
      <ChatLog>
        {messages.map((msg, index) => (
          <ChatMessage key={index} $isMine={msg.isMine}>
            {msg.text}
          </ChatMessage>
        ))}
      </ChatLog>
      <ChatInputContainer>
        <ChatInput
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Write a message"
        />
        <ChatButton onClick={handleSendMessage}>Send</ChatButton>
      </ChatInputContainer>
    </ChatContainer>
  )
}

export default Chat
