import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { CheckIcon } from '../assets/CheckIcon'
import { ErrorIcon } from '../assets/ErrorIcon'
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
  const [isDragOver, setIsDragOver] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

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
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]

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

  const handleRemoveImage = () => {
    setImage('')
    setImagePreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const regex = /^[0-9]*\.?[0-9]*$/

    if (regex.test(value) || value === '') {
      setPrice(value)
    }
  }

  const isPriceValid = () => {
    return !isNaN(Number(price)) && Number(price) > 0
  }

  return (
    <FormContainer>
      <FileInputContainer
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ borderColor: isDragOver ? '#007bff' : '#adb5bd' }}
      >
        <FileInput
          ref={fileInputRef}
          type="file"
          onChange={handleImageChange}
          accept="image/*"
        />
        {!imagePreview && (
          <>
            <PlusIcon />
            <p>Upload</p>
          </>
        )}
        {imagePreview && (
          <ImagePreviewContainer>
            <ImagePreview src={imagePreview} alt="preview" />
            <RemoveImageButton onClick={handleRemoveImage}>
              <CrossIcon />
            </RemoveImageButton>
          </ImagePreviewContainer>
        )}
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
        <InputContainer>
          <Input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter price"
            required
          />
          {price && (isPriceValid() ? <CheckValid /> : <ErrorValid />)}
        </InputContainer>
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
  max-width: 455px;
  width: 100%;

  @media ${devices.laptop} {
    width: 455px;
    padding: 0 47.5px;
  }

  @media ${devices.mobile} {
    padding: 0 31px;
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
  margin-bottom: 12px;

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

const CheckValid = styled(CheckIcon)`
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
`

const ErrorValid = styled(ErrorIcon)`
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const Input = styled.input`
  padding: 10px;
  padding-right: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;

  &:focus + ${CheckValid}, &:focus + ${ErrorValid} {
    display: block;
  }
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
`

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImagePreviewContainer = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const RemoveImageButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 100px;
  width: 30px;
  height: 30px;
  padding: 8px;
`

const CrossIcon = styled(PlusIcon)`
  transform: rotate(45deg);
`
