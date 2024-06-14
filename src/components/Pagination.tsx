import styled from 'styled-components'
import { ChevronLeft } from '../assets/ChevronLeft'
import { ChevronRight } from '../assets/ChevronRight'

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
            <ChevronLeft />
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
            <ChevronRight />
          </PageLink>
        </PageItem>
      </ul>
    </Nav>
  )
}

export default Pagination

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #fff;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`

const PageItem = styled.li`
  margin: 0;

  &:first-child a {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-left: 1px solid #e9ecef;
    width: 48px;
  }

  &:last-child a {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 48px;
  }
`

const PageLink = styled.a<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #e9ecef;
  border-left: none;
  cursor: pointer;
  color: #6c757d;
  text-decoration: none;

  &:not(:first-child) {
    border-left: 1px solid #e9ecef;
  }

  ${props =>
    props.disabled &&
    `
    pointer-events: none;
    color: #adb5bd;
    border-color: #e9ecef;
  `}

  &.active {
    background-color: #7749f8;
    color: white;
    border: 1px solid #7749f8;
  }

  &:hover:not(.active):not([disabled]) {
    background-color: #f8f9fa;
  }
`
