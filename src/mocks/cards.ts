import { avatar } from '../assets/avatar_image'
import { TileData } from '../utils/types'

export const exampleTiles: TileData[] = Array(6)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: 'Tile 1',
    description: 'Description 1',
    image: avatar,
    price: 10
  }))
