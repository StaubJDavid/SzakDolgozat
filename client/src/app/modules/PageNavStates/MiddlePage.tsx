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
      <li className="page-item"><a className="page-link" onClick={() => passedFc(1)}>{1}</a></li>
      <li className="page-item disabled"><a className="page-link">...</a></li>
      <li className="page-item"><a className="page-link" onClick={() => passedFc(currentPage - 1)}>{currentPage - 1}</a></li>
      <li className="page-item disabled"><a className="page-link" onClick={() => passedFc(currentPage)}>{currentPage}</a></li>
      <li className="page-item"><a className="page-link" onClick={() => passedFc(currentPage + 1)}>{currentPage + 1}</a></li>
      <li className="page-item disabled"><a className="page-link">...</a></li>
      <li className="page-item"><a className="page-link" onClick={() => passedFc(maxPage)}>{maxPage}</a></li>
    </ul>
  )
}

export {MiddlePage}
