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
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
