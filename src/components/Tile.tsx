import styled from 'styled-components'
import { TileData } from '../utils/types'

interface TileProps {
  tile: TileData
}

const Tile = ({ tile }: TileProps) => {
  return (
    <StyledTile>
      <img src={tile.Image} alt={tile.Name} />
      <h3>{tile.Name}</h3>
      <p>{tile.Description}</p>
      <p className="price">Price: ${tile.Price}</p>
    </StyledTile>
  )
}

export default Tile

const StyledTile = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;

  img {
    width: 100%;
  }

  h3 {
    margin: 0.5em 0;
  }

  p {
    margin: 0.5em 0;
  }

  .price {
    font-weight: bold;
  }
`
