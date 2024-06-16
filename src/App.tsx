import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Chat from './components/Chat'
import Pagination from './components/Pagination'
import Tile from './components/Tile'
import { exampleTiles } from './mocks/cards'
import { devices } from './styles/global-styles'
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
    <Container>
      <TilesList>
        <Tiles>
          {currentTiles.map(tile => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </Tiles>
        <Pagination
          totalTiles={tiles.length}
          tilesPerPage={tilesPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </TilesList>
      <Chat />
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 92px;
`

const TilesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 49px;
`

const Tiles = styled.div`
  display: grid;
  gap: 21px;

  @media ${devices.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }

  @media ${devices.tablet} {
    grid-template-columns: repeat(2, 2fr);
  }
`
