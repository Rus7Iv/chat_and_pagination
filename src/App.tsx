import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { postTile } from './api/api'
import { ChevronLeft } from './assets/ChevronLeft'
import { PlusIcon } from './assets/PlusIcon'
import AddTileForm from './components/AddTileForm'
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
    'buttons' | 'pagination' | 'chat' | 'addTile'
  >('buttons')
  const [showAddTileForm, setShowAddTileForm] = useState(false)

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

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeleteTile = (id: string) => {
    const updatedTiles = tiles.filter(tile => tile.id !== id)
    setTiles(updatedTiles)
    localStorage.setItem('tiles', JSON.stringify(updatedTiles))
  }

  const handleSaveTile = (newTile: TileData) => {
    try {
      const updatedTiles = [...tiles, newTile]
      setTiles(updatedTiles)
      localStorage.setItem('tiles', JSON.stringify(updatedTiles))
      setShowAddTileForm(false)
      postTile(newTile)
    } catch (error) {
      if (error instanceof DOMException && error.code === 22) {
        alert(
          'Ошибка: Недостаточно места в localStorage. Пожалуйста, освободите место и попробуйте снова.'
        )
      } else {
        alert('Произошла неизвестная ошибка при сохранении плитки.')
      }
    }
  }

  const handleBack = () => {
    setVisibleComponent('buttons')
    setShowAddTileForm(false)
  }

  return (
    <Container>
      <DesktopView>
        <TilesList>
          <Tiles>
            {currentTiles.map(tile => (
              <Tile
                key={tile.id}
                tile={tile}
                onDelete={() => handleDeleteTile(tile.id)}
              />
            ))}
          </Tiles>
          <AddedBtnAndPagination>
            <PaginationContainer>
              <Pagination
                totalTiles={tiles.length}
                tilesPerPage={tilesPerPage}
                currentPage={currentPage}
                paginate={paginate}
              />
            </PaginationContainer>
            <AddedTileButton
              onClick={() => setShowAddTileForm(!showAddTileForm)}
            >
              {showAddTileForm ? <ChevronLeft /> : <PlusIcon />}
            </AddedTileButton>
          </AddedBtnAndPagination>
        </TilesList>
        {showAddTileForm ? (
          <AddTileForm
            onSave={handleSaveTile}
            tiles={tiles}
            setTiles={setTiles}
          />
        ) : (
          <Chat />
        )}
      </DesktopView>

      {visibleComponent === 'buttons' && (
        <ButtonsContainer>
          <Button onClick={() => setVisibleComponent('pagination')}>
            Pagination
          </Button>
          <Button onClick={() => setShowAddTileForm(true)}>Add tile</Button>
          <Button onClick={() => setVisibleComponent('chat')}>Chat</Button>
        </ButtonsContainer>
      )}

      {(visibleComponent === 'pagination' ||
        visibleComponent === 'chat' ||
        showAddTileForm) && (
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
                    <Tile
                      key={tile.id}
                      tile={tile}
                      onDelete={() => handleDeleteTile(tile.id)}
                    />
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
          {showAddTileForm && (
            <AddTileForm
              onSave={handleSaveTile}
              tiles={tiles}
              setTiles={setTiles}
            />
          )}
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

const AddedTileButton = styled(Button)`
  width: 60px;
  height: 40px;
  display: flex;
  margin-left: auto;
  justify-content: center;
`

const AddedBtnAndPagination = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
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
