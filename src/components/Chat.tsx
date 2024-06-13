import React, { useState, useEffect } from 'react'
import { ChatEntry } from '../utils/types'

const Chat: React.FC = () => {
  const questions = [
    'Как вас зовут?',
    'Какой ваш любимый цвет?',
    'Где вы живете?'
  ]

  const [chatLog, setChatLog] = useState<ChatEntry[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [answer, setAnswer] = useState<string>('')

  useEffect(() => {
    const storedChat = JSON.parse(localStorage.getItem('chatLog') || '[]')
    if (storedChat) {
      setChatLog(storedChat)
      setCurrentQuestionIndex(storedChat.length)
    }
  }, [])

  const handleSendMessage = () => {
    if (answer.trim()) {
      const newChatLog = [
        ...chatLog,
        { question: questions[currentQuestionIndex], answer }
      ]
      setChatLog(newChatLog)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setAnswer('')
      localStorage.setItem('chatLog', JSON.stringify(newChatLog))
    }
  }

  return (
    <div className="chat">
      <div className="chat-log">
        {chatLog.map((entry, index) => (
          <div key={index}>
            <p>
              <strong>Q:</strong> {entry.question}
            </p>
            <p>
              <strong>A:</strong> {entry.answer}
            </p>
          </div>
        ))}
      </div>
      {currentQuestionIndex < questions.length && (
        <div className="chat-input">
          <p>{questions[currentQuestionIndex]}</p>
          <input
            type="text"
            value={answer}
            onChange={e => setAnswer(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  )
}

export default Chat
