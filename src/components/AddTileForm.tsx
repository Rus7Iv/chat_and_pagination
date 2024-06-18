import React, { useState } from 'react'
import styled from 'styled-components'
import { devices } from '../styles/global-styles'
import { TileData } from '../utils/types'

interface AddTileFormProps {
  onSave: (tile: TileData) => void
  tiles: TileData[]
  setTiles: React.Dispatch<React.SetStateAction<TileData[]>>
}

const AddTileForm: React.FC<AddTileFormProps> = ({
  onSave,
  tiles,
  setTiles
}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')

  const resetForm = () => {
    setName('')
    setDescription('')
    setPrice('')
    setImage('')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      const maxFileSize = 5 * 1024 * 1024
      if (file.size > maxFileSize) {
        alert(
          'Изображение слишком большое. Размер файла не должен превышать 5 МБ.'
        )
        return
      }

      const reader = new FileReader()
      reader.onload = loadEvent => {
        if (loadEvent.target) {
          const base64Image = loadEvent.target.result as string
          setImage(base64Image)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (
      !name ||
      !description ||
      isNaN(Number(price)) ||
      Number(price) <= 0 ||
      !image
    ) {
      alert(
        'Пожалуйста, заполните все поля корректно и убедитесь, что цена является положительным числом.'
      )
      return
    }
    const newTile = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      image,
      price: Number(price)
    }

    setTiles(prevTiles => [...prevTiles, newTile])

    try {
      localStorage.setItem('tiles', JSON.stringify([...tiles, newTile]))
      onSave(newTile)
    } catch (error) {
      if (error instanceof DOMException && error.code === 22) {
        alert(
          'Ошибка: Недостаточно места в localStorage. Пожалуйста, освободите место и попробуйте снова.'
        )
      } else {
        alert('Произошла неизвестная ошибка при сохранении плитки.')
      }
      resetForm()
    }
  }

  return (
    <FormContainer>
      <Input type="file" onChange={handleImageChange} accept="image/*" />
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
