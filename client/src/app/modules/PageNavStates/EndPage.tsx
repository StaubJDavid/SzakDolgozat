/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  passedFc: any,
  maxPage: any,
  currentPage: any
}

const EndPage: FC<Props> = ({passedFc, maxPage, currentPage}) => {

  return (
    <ul className="pagination justify-content-center">
      <li className="page-item"><a className="page-link" onClick={() => passedFc(1)}>{1}</a></li>
      <li className="page-item disabled"><a className="page-link">...</a></li>
      <li className={"page-item" + (currentPage === maxPage-3 ? ' disabled' : '')}><a className="page-link" onClick={() => passedFc(maxPage - 3)}>{maxPage - 3}</a></li>
      <li className={"page-item" + (currentPage === maxPage-2 ? ' disabled' : '')}><a className="page-link" onClick={() => passedFc(maxPage - 2)}>{maxPage - 2}</a></li>
      <li className={"page-item" + (currentPage === maxPage-1 ? ' disabled' : '')}><a className="page-link" onClick={() => passedFc(maxPage - 1)}>{maxPage - 1}</a></li>
      <li className={"page-item" + (currentPage === maxPage ? ' disabled' : '')}><a className="page-link" onClick={() => passedFc(maxPage)}>{maxPage}</a></li>
    </ul>
  )
}

export {EndPage}
