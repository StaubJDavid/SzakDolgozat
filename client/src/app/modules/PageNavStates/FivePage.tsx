/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'

type Props = {
  passedFc: any,
  currentPage: any,
  maxPage: any
}

const FivePage: FC<Props> = ({passedFc, currentPage, maxPage}) => {

  function makeNavList(currentPage:number, maxPage:any){
    let list:any = [];
    for (let i=1; i <= maxPage; i++) {
      list.push(<li className={"page-item" + (currentPage === i ? ' disabled' : '')}><button className="page-link" onClick={() => passedFc(i)}>{i}</button></li>);
    }
    
    return list;
  }

  return (
    <ul className="pagination justify-content-center">
        {makeNavList(currentPage, maxPage)}
    </ul>
  )
}

export {FivePage}
