import styled from 'styled-components'

interface PaginationProps {
  totalTiles: number
  tilesPerPage: number
  currentPage: number
  paginate: (pageNumber: number) => void
}

const Pagination = ({
  totalTiles,
  tilesPerPage,
  paginate
}: PaginationProps) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalTiles / tilesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <Nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <PageItem key={number}>
            <PageLink onClick={() => paginate(number)} href="#!">
              {number}
            </PageLink>
          </PageItem>
        ))}
      </ul>
    </Nav>
  )
}

export default Pagination

const Nav = styled.nav`
  .pagination {
    display: flex;
    list-style: none;
  }
`

const PageItem = styled.li`
  margin: 0 5px;
`

const PageLink = styled.a`
  cursor: pointer;
  color: #007bff;
  text-decoration: none;
`
