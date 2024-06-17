import React, { useState } from 'react'
import styled from 'styled-components'
import { devices } from '../styles/global-styles'
import { TileData } from '../utils/types'

interface AddTileFormProps {
  onSave: (tile: TileData) => void
}

const AddTileForm: React.FC<AddTileFormProps> = ({ onSave }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const handleSave = () => {
    if (!name || !description || isNaN(Number(price)) || Number(price) <= 0) {
      alert(
        'Пожалуйста, заполните все поля корректно и убедитесь, что цена является положительным числом.'
      )
      return
    }
    const newTile = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      image: '',
      price: Number(price)
    }
    onSave(newTile)
  }

  return (
    <FormContainer>
      <Input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Имя"
        required
      />
      <Textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Описание"
        required
      />
      <Input
        type="text"
        value={price}
        onChange={e => setPrice(e.target.value)}
        placeholder="Цена"
        required
      />
      <SaveButton type="button" onClick={handleSave}>
        Сохранить
      </SaveButton>
    </FormContainer>
  )
}

export default AddTileForm

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 10px;
  padding: 20px;
  max-width: 455px;
  width: 100%;

  @media ${devices.laptop} {
    width: 455px;
  }
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`
