import { useState } from 'react'
import styled from 'styled-components'
import { DeleteIcon } from '../assets/DeleteIcon'
import { TileData } from '../utils/types'
import ConfirmationModal from './ConfirmationModal'

interface TileProps {
  tile: TileData
  onDelete: () => void
}

const Tile = ({ tile, onDelete }: TileProps) => {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleDeleteClick = () => {
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
  }

  const handleConfirmDelete = () => {
    onDelete()
    setModalOpen(false)
  }

  return (
    <>
      <StyledTile>
        <DeleteButton onClick={handleDeleteClick}>
          <DeleteIcon />
        </DeleteButton>
        <img src={tile.image} alt={tile.name} />
        <DescriptionText>
          <div>
            <p>{tile.name}</p>
            <p className="description">{tile.description}</p>
          </div>
          <p>{tile.price} ₽</p>
        </DescriptionText>
      </StyledTile>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleClose}
        content={<p>Вы уверены, что хотите удалить {tile.name}?</p>}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default Tile

const StyledTile = styled.div`
  position: relative;
  border: 1px solid #dee2e6;
  border-radius: 12px;
  box-sizing: border-box;
  padding: 0;
  width: 337px;
  height: 377px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;

  img {
    flex-grow: 1;
    flex-shrink: 1;
    object-fit: cover;
    height: 100%;
    max-height: 265px;
    width: 100%;

    &:hover {
      filter: brightness(0.45);
    }
  }

  p {
    margin: 0;
  }

  .description {
    color: #68717a;
    font-weight: 400;
    font-size: 16px;
  }

  &:hover {
    border: 1px solid #7749f8;
    box-shadow: 0px 0px 0px 2px #e8dbfd;

    img {
      filter: brightness(0.45);
    }

    button {
      display: block;
    }
  }

  &:active {
    border: 1px solid black;
  }
`

const DescriptionText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 112px;
  padding: 24px;
  box-sizing: border-box;

  font-weight: 600;
  font-size: 20px;
`

const DeleteButton = styled.button`
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #ff4c4c;
  z-index: 100;

  &:hover {
    color: #cc0000;
    ~ img {
      filter: brightness(0.45);
    }
  }
`
