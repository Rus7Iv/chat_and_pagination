import React from 'react'
import styled from 'styled-components'
import { ChevronLeft } from '../assets/ChevronLeft'
import { ChevronRight } from '../assets/ChevronRight'

interface PaginationProps {
  totalTiles: number
  tilesPerPage: number
  currentPage: number
  paginate: (pageNumber: number) => void
}

const getVisiblePageNumbers = (currentPage: number, totalPages: number) => {
  const maxVisiblePages = 5
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  if (currentPage <= halfMaxVisiblePages) {
    return [
      ...Array.from({ length: halfMaxVisiblePages }, (_, i) => i + 1),
      '...',
      totalPages
    ]
  }

  if (currentPage > totalPages - halfMaxVisiblePages) {
    return [
      1,
      '...',
      ...Array.from(
        { length: totalPages - currentPage + halfMaxVisiblePages },
        (_, i) => currentPage - halfMaxVisiblePages + i + 1
      )
    ]
  }

  return [
    1,
    '...',
    ...Array.from(
      { length: maxVisiblePages - 2 },
      (_, i) => currentPage - halfMaxVisiblePages + i + 1
    ),
    '...',
    totalPages
  ]
}

const Pagination: React.FC<PaginationProps> = ({
  totalTiles,
  tilesPerPage,
  currentPage,
  paginate
}: PaginationProps) => {
  const totalPages = Math.ceil(totalTiles / tilesPerPage)
  const visiblePageNumbers = getVisiblePageNumbers(currentPage, totalPages)

  const handlePageClick = (
    pageNumber: number | string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    if (typeof pageNumber === 'number') {
      event.preventDefault()
      paginate(pageNumber)
    }
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
        {visiblePageNumbers.map((number, index) => (
          <PageItem key={index}>
            <PageLink
              onClick={event => handlePageClick(number, event)}
              href="#"
              className={
                typeof number === 'number' && currentPage === number
                  ? 'active'
                  : ''
              }
              disabled={typeof number !== 'number'}
            >
              {number}
            </PageLink>
          </PageItem>
        ))}
        <PageItem>
          <PageLink
            onClick={event => handlePageClick(currentPage + 1, event)}
            href="#"
            disabled={currentPage === totalPages}
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

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: #fff;
    margin-bottom: 44px;
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

const PageItem = styled.li`
  margin: 0;
  height: 40px;
  box-sizing: border-box;

  &:first-child ${PageLink} {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-left: 1px solid #e9ecef;
    width: 48px;
  }

  &:last-child ${PageLink} {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 48px;
  }
`
