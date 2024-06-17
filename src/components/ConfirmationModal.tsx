import { ReactNode } from 'react'
import styled from 'styled-components'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  content: ReactNode
  onConfirm: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  content,
  onConfirm
}) => {
  if (!isOpen) return null

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        {content}
        <ButtonsContainer>
          <button onClick={onClose}>Отмена</button>
          <button onClick={onConfirm}>Удалить</button>
        </ButtonsContainer>
      </ModalContainer>
    </ModalBackdrop>
  )
}

export default ConfirmationModal

const ModalBackdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    color: #6c757d;
    background-color: #fff;
    border: 1px solid #e9ecef;
    border-radius: 4px;
  }
`
