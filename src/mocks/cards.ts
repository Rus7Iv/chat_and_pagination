import { avatar } from '../assets/avatar_image'
import { TileData } from '../utils/types'

export const exampleTiles: TileData[] = Array(25)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: `Tile ${index + 1}`,
    description: `Description ${index + 1}`,
    image: avatar,
    price: (index + 1) * 10
  }))
