import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { botQuestions } from '../mocks/questions'
import { devices } from '../styles/global-styles'

interface Message {
  text: string
  isMine: boolean
}

const initialMessages: Message[] = [
  { text: 'Привет, я чат-бот! Как вас зовут?', isMine: false }
]

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const chatLogRef = useRef<HTMLDivElement>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false)

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = { text: input, isMine: true }
      setMessages([...messages, newMessage])
      setInput('')

      if (!isBotTyping && currentQuestionIndex < botQuestions.length) {
        setIsBotTyping(true)
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: botQuestions[currentQuestionIndex], isMine: false }
          ])
          setCurrentQuestionIndex(prevIndex => prevIndex + 1)
          setIsBotTyping(false)
        }, 1000)
      }
    }
  }

  const handleClearInput = () => {
    setInput('')
    setIsError(true)
    setTimeout(() => {
      setIsError(false)
    }, 2000)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    } else if (e.key === 'Enter' && e.shiftKey) {
      setInput(input + '\n')
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
      const lastMessage = chatLog.lastElementChild
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' })
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
          {isBotTyping && <TypingIndicator />}
        </MessagesContainer>
      </ChatLog>
      <ChatInputContainer>
        <ChatInputWrapper>
          <ChatInput
            as="textarea"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message"
            className={isError ? 'error' : ''}
          />
          {input && (
            <>
              <ChatButton onClick={handleSendMessage}>
                {String.fromCharCode(0x27a4)}
              </ChatButton>
              <ClearButton onClick={handleClearInput}>
                {String.fromCharCode(0x2715)}
              </ClearButton>
            </>
          )}
        </ChatInputWrapper>
      </ChatInputContainer>
    </ChatContainer>
  )
}

export default Chat

const ChatContainer = styled.div`
  width: 90vw;
  height: 80vh;
  max-width: 455px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  box-sizing: border-box;

  @media ${devices.laptop} {
    width: 455px;
    height: 600px;
  }
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
    box-shadow: inset 0 0 0 2px #fff;
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

const ChatInputWrapper = styled.div`
  position: relative;
`

const errorAnimation = keyframes`
  0% {
    border-color: #dc3545;
    box-shadow: 0px 0px 0px 2px #f8d7da;
  }
  50% {
    border-color: #dc3545;
    box-shadow: 0px 0px 0px 4px #f8d7da;
  }
  100% {
    border-color: #dee2e6;
    box-shadow: 0px 0px 0px 2px transparent;
  }
`

const ChatInput = styled.textarea`
  width: 100%;
  height: 112px;
  padding: 16px;
  padding-right: 50px;
  box-sizing: border-box;
  border-radius: 6px;
  border: 1px solid #dee2e6;
  resize: none;
  font-family: Inter, sans-serif;

  &:hover {
    border: 1px solid #7749f8;
    box-shadow: 0px 0px 0px 2px #e8dbfd;
  }

  &.error {
    animation: ${errorAnimation} 2s ease-in-out;
  }
`

const ButtonBase = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: white;
  padding: 0;
`

const ChatButton = styled(ButtonBase)`
  right: 20px;
  bottom: 20px;
  background-color: #007bff;
`

const ClearButton = styled(ButtonBase)`
  right: 20px;
  top: 20px;
  background-color: #dc3545;
`

const typingAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`

const TypingIndicator = styled.div`
  width: 60px;
  height: 24px;
  position: relative;
  margin: 0 auto;

  &::before,
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    background: #9ec5fe;
    border-radius: 50%;
    position: absolute;
    animation: ${typingAnimation} 1s infinite ease;
  }

  &::before {
    left: 0;
    animation-delay: -0.5s;
  }

  &::after {
    right: 0;
  }
`
