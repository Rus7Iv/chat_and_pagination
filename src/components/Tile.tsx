import { TileData } from '../utils/types'

interface TileProps {
  tile: TileData
}

const Tile = ({ tile }: TileProps) => {
  return (
    <div className="tile">
      <img src={tile.Image} alt={tile.Name} />
      <h3>{tile.Name}</h3>
      <p>{tile.Description}</p>
      <p>Price: ${tile.Price}</p>
    </div>
  )
}

export default Tile
