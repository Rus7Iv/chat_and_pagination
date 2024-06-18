import React, { useState } from 'react'
import styled from 'styled-components'
import { PlusIcon } from '../assets/PlusIcon'
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
  const [imagePreview, setImagePreview] = useState('')

  const resetForm = () => {
    setName('')
    setDescription('')
    setPrice('')
    setImage('')
    setImagePreview('')
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

      setImage(file.name)
      const reader = new FileReader()
      reader.onload = loadEvent => {
        if (loadEvent.target) {
          const base64Image = loadEvent.target.result as string
          setImage(base64Image)
          setImagePreview(base64Image)
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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleImageChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <FormContainer>
      <FileInputContainer onDragOver={handleDragOver} onDrop={handleDrop}>
        <FileInput type="file" onChange={handleImageChange} accept="image/*" />
        {!imagePreview && (
          <>
            <PlusIcon />
            <p>Upload</p>
          </>
        )}
        {imagePreview && <ImagePreview src={imagePreview} alt={image} />}
      </FileInputContainer>
      <TitleWithInput>
        <p>Name</p>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter product name"
          required
        />
      </TitleWithInput>
      <TitleWithInput>
        <p>Description</p>
        <Textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter product description"
          required
        />
      </TitleWithInput>
      <TitleWithInput>
        <p>Price</p>
        <Input
          type="text"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Enter price"
          required
        />
      </TitleWithInput>
      <SaveButton type="button" onClick={handleSave}>
        Save
      </SaveButton>
    </FormContainer>
  )
}

export default AddTileForm

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  gap: 28px;
  padding: 0 47.5px;
  max-width: 455px;
  width: 100%;

  @media ${devices.laptop} {
    width: 455px;
  }
`

const FileInputContainer = styled.div`
  width: 334px;
  height: 334px;
  border: 1px dashed #adb5bd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-size: 16px;
  flex-direction: column;

  p {
    margin: 0;
    color: #6c757d;
  }
`

const FileInput = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
`

const TitleWithInput = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  p {
    line-height: 24.2px;
    font-weight: 600;
    font-size: 20px;
    margin: 0 0 8px;
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
  font-family: Inter, sans-serif;
`

const SaveButton = styled.button`
  padding: 10px;
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
