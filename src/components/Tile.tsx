import styled from 'styled-components'
import { TileData } from '../utils/types'

interface TileProps {
  tile: TileData
}

const Tile = ({ tile }: TileProps) => {
  return (
    <StyledTile>
      <img src={tile.Image} alt={tile.Name} />
      <DescriptionText>
        <div>
          <p>{tile.Name}</p>
          <p className="description">{tile.Description}</p>
        </div>
        <p>{tile.Price} ₽</p>
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

  img {
    flex-grow: 1;
    flex-shrink: 1;
    object-fit: cover;
    height: 100%;
  }

  p {
    margin: 0;
  }

  .description {
    color: #68717a;
    font-weight: 400;
    font-size: 16px;
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
