/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  passedFc: any,
  currentPage: any,
  maxPage: any
}

const MiddlePage: FC<Props> = ({passedFc, currentPage, maxPage}) => {

  return (
    <ul className="pagination justify-content-center">
      <li key={1} className="opage-item"><button className="opage-link" onClick={() => passedFc(1)}>{1}</button></li>
      <li key={2} className="opage-item disabled"><button className="opage-link">...</button></li>
      <li key={3} className="opage-item"><button className="opage-link" onClick={() => passedFc(currentPage - 1)}>{currentPage - 1}</button></li>
      <li key={4} className="opage-item active"><button className="opage-link" onClick={() => passedFc(currentPage)}>{currentPage}</button></li>
      <li key={5} className="opage-item"><button className="opage-link" onClick={() => passedFc(currentPage + 1)}>{currentPage + 1}</button></li>
      <li key={6} className="opage-item disabled"><button className="opage-link">...</button></li>
      <li key={7} className="opage-item"><button className="opage-link" onClick={() => passedFc(maxPage)}>{maxPage}</button></li>
    </ul>
  )
}

export {MiddlePage}
