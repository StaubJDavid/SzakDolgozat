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
      <li className="page-item"><button className="page-link" onClick={() => passedFc(1)}>{1}</button></li>
      <li className="page-item disabled"><button className="page-link">...</button></li>
      <li className="page-item"><button className="page-link" onClick={() => passedFc(currentPage - 1)}>{currentPage - 1}</button></li>
      <li className="page-item disabled"><button className="page-link" onClick={() => passedFc(currentPage)}>{currentPage}</button></li>
      <li className="page-item"><button className="page-link" onClick={() => passedFc(currentPage + 1)}>{currentPage + 1}</button></li>
      <li className="page-item disabled"><button className="page-link">...</button></li>
      <li className="page-item"><button className="page-link" onClick={() => passedFc(maxPage)}>{maxPage}</button></li>
    </ul>
  )
}

export {MiddlePage}
