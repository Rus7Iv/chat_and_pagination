import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ChevronLeft } from './assets/ChevronLeft'
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
  const [visibleComponent, setVisibleComponent] = useState<
    'buttons' | 'pagination' | 'chat'
  >('buttons')

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

  const handleBack = () => {
    setVisibleComponent('buttons')
  }

  return (
    <Container>
      <DesktopView>
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
      </DesktopView>

      {visibleComponent === 'buttons' && (
        <ButtonsContainer>
          <Button onClick={() => setVisibleComponent('pagination')}>
            Pagination
          </Button>
          <Button onClick={() => setVisibleComponent('chat')}>Chat</Button>
        </ButtonsContainer>
      )}

      {(visibleComponent === 'pagination' || visibleComponent === 'chat') && (
        <ComponentContainer>
          <MobileHeader>
            <BackButton onClick={handleBack}>
              <ChevronLeft />
            </BackButton>
          </MobileHeader>
          {visibleComponent === 'pagination' && (
            <>
              <TilesList>
                <Tiles>
                  {currentTiles.map(tile => (
                    <Tile key={tile.id} tile={tile} />
                  ))}
                </Tiles>
              </TilesList>
              <Pagination
                totalTiles={tiles.length}
                tilesPerPage={tilesPerPage}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
          {visibleComponent === 'chat' && <Chat />}
        </ComponentContainer>
      )}
    </Container>
  )
}

export default App

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media ${devices.laptop} {
    display: none;
  }
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  color: #6c757d;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 4px;
`

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 27px;
  margin-top: 80px;

  @media ${devices.laptop} {
    display: none;
  }
`

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 4px;

  @media ${devices.laptop} {
    display: none;
  }
`

const DesktopView = styled.div`
  display: none;

  @media ${devices.laptop} {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 92px;
  }
`

const MobileHeader = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  position: fixed;
  top: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  padding: 20px;
  padding-left: 40px;
`
