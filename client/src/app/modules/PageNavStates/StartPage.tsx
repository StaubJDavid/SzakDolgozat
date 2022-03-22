/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  passedFc: any,
  maxPage: any,
  currentPage: any
}

const StartPage: FC<Props> = ({passedFc, maxPage, currentPage}) => {

  return (
    <ul className="pagination justify-content-center">
      <li key={1} className={"opage-item" + (currentPage === 1 ? ' active' : '')}><button className="opage-link" onClick={() => passedFc(1)}>{1}</button></li>
      <li key={2} className={"opage-item" + (currentPage === 2 ? ' active' : '')}><button className="opage-link" onClick={() => passedFc(2)}>{2}</button></li>
      <li key={3} className={"opage-item" + (currentPage === 3 ? ' active' : '')}><button className="opage-link" onClick={() => passedFc(3)}>{3}</button></li>
      <li key={4} className={"opage-item" + (currentPage === 4 ? ' active' : '')}><button className="opage-link" onClick={() => passedFc(4)}>{4}</button></li>
      <li key={5} className="opage-item disabled"><button className="opage-link">...</button></li>
      <li key={6} className="opage-item"><button className="opage-link" onClick={() => passedFc(maxPage)}>{maxPage}</button></li>
    </ul>
  )
}

export {StartPage}
