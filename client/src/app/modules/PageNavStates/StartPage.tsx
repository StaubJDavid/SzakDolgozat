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
      <li className={"page-item" + (currentPage === 1 ? ' disabled' : '')}><a className="page-link" onClick={() => passedFc(1)}>{1}</a></li>
      <li className={"page-item" + (currentPage === 2 ? ' disabled' : '')}><a className="page-link" onClick={() => passedFc(2)}>{2}</a></li>
      <li className={"page-item" + (currentPage === 3 ? ' disabled' : '')}><a className="page-link" onClick={() => passedFc(3)}>{3}</a></li>
      <li className={"page-item" + (currentPage === 4 ? ' disabled' : '')}><a className="page-link" onClick={() => passedFc(4)}>{4}</a></li>
      <li className="page-item disabled"><a className="page-link">...</a></li>
      <li className="page-item"><a className="page-link" onClick={() => passedFc(maxPage)}>{maxPage}</a></li>
    </ul>
  )
}

export {StartPage}
