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
      <li className="page-item"><button className="page-link" onClick={() => passedFc(1)}>{1}</button></li>
      <li className="page-item disabled"><button className="page-link">...</button></li>
      <li className={"page-item" + (currentPage === maxPage-3 ? ' disabled' : '')}><button className="page-link" onClick={() => passedFc(maxPage - 3)}>{maxPage - 3}</button></li>
      <li className={"page-item" + (currentPage === maxPage-2 ? ' disabled' : '')}><button className="page-link" onClick={() => passedFc(maxPage - 2)}>{maxPage - 2}</button></li>
      <li className={"page-item" + (currentPage === maxPage-1 ? ' disabled' : '')}><button className="page-link" onClick={() => passedFc(maxPage - 1)}>{maxPage - 1}</button></li>
      <li className={"page-item" + (currentPage === maxPage ? ' disabled' : '')}><button className="page-link" onClick={() => passedFc(maxPage)}>{maxPage}</button></li>
    </ul>
  )
}

export {EndPage}
