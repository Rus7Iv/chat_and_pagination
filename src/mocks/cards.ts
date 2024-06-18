import { avatar } from '../assets/avatar_image'
import { TileData } from '../utils/types'

export const exampleTiles: TileData[] = Array(11)
  .fill(null)
  .map((_, index) => ({
    id: (index + 1).toString(),
    name: `Tile ${index + 1}`,
    description: `Description ${index + 1}`,
    image: avatar,
    price: (index + 1) * 10
  }))
