import React, { useState, useEffect } from 'react'
import Chat from './components/Chat'
import Pagination from './components/Pagination'
import Tile from './components/Tile'
import { exampleTiles } from './mocks/cards'
import { TileData } from './utils/types'

const App: React.FC = () => {
  const [tiles, setTiles] = useState<TileData[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tilesPerPage] = useState<number>(4)

  useEffect(() => {
    const storedTiles = JSON.parse(localStorage.getItem('tiles') || '[]')
    if (storedTiles.length > 0) {
      setTiles(storedTiles)
    } else {
      setTiles(exampleTiles)
      localStorage.setItem('tiles', JSON.stringify(exampleTiles))
    }
  }, [])

  const indexOfLastTile = currentPage * tilesPerPage
  const indexOfFirstTile = indexOfLastTile - tilesPerPage
  const currentTiles = tiles.slice(indexOfFirstTile, indexOfLastTile)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container">
      <div className="tiles">
        {currentTiles.map(tile => (
          <Tile key={tile.id} tile={tile} />
        ))}
      </div>
      <Pagination
        totalTiles={tiles.length}
        tilesPerPage={tilesPerPage}
        currentPage={currentPage}
        paginate={paginate}
      />
      <Chat />
    </div>
  )
}

export default App
