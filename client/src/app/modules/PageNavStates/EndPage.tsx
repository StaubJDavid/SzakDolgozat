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
      <li key={1} className="opage-item"><button className="opage-link" onClick={() => passedFc(1)}>{1}</button></li>
      <li key={2} className="opage-item disabled"><button className="opage-link">...</button></li>
      <li key={3} className={"opage-item" + (currentPage === maxPage-3 ? ' active' : '')}><button className="opage-link" onClick={() => passedFc(maxPage - 3)}>{maxPage - 3}</button></li>
      <li key={4} className={"opage-item" + (currentPage === maxPage-2 ? ' active' : '')}><button className="opage-link" onClick={() => passedFc(maxPage - 2)}>{maxPage - 2}</button></li>
      <li key={5} className={"opage-item" + (currentPage === maxPage-1 ? ' active' : '')}><button className="opage-link" onClick={() => passedFc(maxPage - 1)}>{maxPage - 1}</button></li>
      <li key={6} className={"opage-item" + (currentPage === maxPage ? ' active' : '')}><button className="opage-link" onClick={() => passedFc(maxPage)}>{maxPage}</button></li>
    </ul>
  )
}

export {EndPage}
