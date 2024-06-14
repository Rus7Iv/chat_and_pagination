import styled from 'styled-components'
import { TileData } from '../utils/types'

interface TileProps {
  tile: TileData
}

const Tile = ({ tile }: TileProps) => {
  return (
    <StyledTile>
      <img src={tile.image} alt={tile.name} />
      <DescriptionText>
        <div>
          <p>{tile.name}</p>
          <p className="description">{tile.description}</p>
        </div>
        <p>{tile.price} ₽</p>
      </DescriptionText>
    </StyledTile>
  )
}

export default Tile

const StyledTile = styled.div`
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
    width: 100%;
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
