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
  currentPage,
  paginate
}: PaginationProps) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalTiles / tilesPerPage); i++) {
    pageNumbers.push(i)
  }

  const handlePageClick = (
    pageNumber: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault()
    paginate(pageNumber)
  }

  return (
    <Nav>
      <ul className="pagination">
        <PageItem>
          <PageLink
            onClick={event => handlePageClick(currentPage - 1, event)}
            href="#"
            disabled={currentPage === 1}
          >
            &laquo;
          </PageLink>
        </PageItem>
        {pageNumbers.map(number => (
          <PageItem key={number}>
            <PageLink
              onClick={event => handlePageClick(number, event)}
              href="#"
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </PageLink>
          </PageItem>
        ))}
        <PageItem>
          <PageLink
            onClick={event => handlePageClick(currentPage + 1, event)}
            href="#"
            disabled={currentPage === Math.ceil(totalTiles / tilesPerPage)}
          >
            &raquo;
          </PageLink>
        </PageItem>
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

const PageLink = styled.a<{ disabled?: boolean }>`
  cursor: pointer;
  color: #007bff;
  text-decoration: none;
  ${props =>
    props.disabled &&
    `
    pointer-events: none;
    color: #6c757d;
  `}
  &.active {
    font-weight: bold;
  }
`
