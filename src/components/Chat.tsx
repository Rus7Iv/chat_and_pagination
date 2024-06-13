import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Message {
  text: string
  isMine: boolean
}

const initialMessages: Message[] = [
  { text: '1 message', isMine: false },
  { text: '2 message', isMine: false },
  { text: '3 message', isMine: true },
  { text: '4 message', isMine: false }
]

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState<string>('')
  const chatLogRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = { text: input, isMine: true }
      setMessages([...messages, newMessage])
      setInput('')
    }
  }

  useEffect(() => {
    const chatLog = chatLogRef.current
    if (chatLog) {
      const hasScrollbar = chatLog.scrollHeight > chatLog.clientHeight
      if (hasScrollbar) {
        chatLog.classList.add('scroll-content')
      } else {
        chatLog.classList.remove('scroll-content')
      }
    }
  }, [messages])

  return (
    <ChatContainer>
      <ChatLog ref={chatLogRef}>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <ChatMessage key={index} $isMine={msg.isMine}>
              {msg.text}
            </ChatMessage>
          ))}
        </MessagesContainer>
      </ChatLog>
      <ChatInputContainer>
        <ChatInput
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

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 455px;
  height: 600px;
  padding: 10px;
  gap: 10px;
`

const ChatLog = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  margin-right: -10px;

  &::-webkit-scrollbar {
    width: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  &.scroll-content {
    padding-right: 0;
  }
`

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100%;
  justify-content: flex-end;
`

const ChatMessage = styled.div<{ $isMine: boolean }>`
  background-color: ${props => (props.$isMine ? '#9EC5FE' : '#EBE5FC')};
  padding: 10px;
  border-radius: 10px;
  align-self: ${props => (props.$isMine ? 'flex-end' : 'flex-start')};
  min-width: 60%;
  max-width: 80%;
  word-break: break-word;
  white-space: pre-wrap;
`

const ChatInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ChatInput = styled.textarea`
  height: 112px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: none;
`

const ChatButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`
