import {FC} from 'react'
import { EndPage } from './PageNavStates/EndPage'
import { FivePage } from './PageNavStates/FivePage'
import { MiddlePage } from './PageNavStates/MiddlePage'
import { StartPage } from './PageNavStates/StartPage'

type Props = {
  passedFc: any,
  currentPage: number,
  total: number,
  limit: number,
  maxPage: number
}

const PageNavBar: FC<Props> = ({passedFc, currentPage, total, limit, maxPage}) => {

  function renderNavbar(){
    let navPageBar: any = <ul className="pagination justify-content-center"><li className="page-item"><a className="page-link">Error</a></li></ul>;

    if(maxPage <= 5){
      navPageBar = <FivePage passedFc={passedFc} currentPage={currentPage} maxPage={maxPage} />;
    }else if(currentPage < 4){
      navPageBar = <StartPage passedFc={passedFc} maxPage={maxPage} currentPage={currentPage} />;
    }else if(currentPage > maxPage - 3){
      navPageBar = <EndPage passedFc={passedFc} maxPage={maxPage} currentPage={currentPage} />;
    }else if(currentPage > 3 && currentPage < maxPage -2){
      navPageBar = <MiddlePage passedFc={passedFc} currentPage={currentPage} maxPage={maxPage} />;
    }

    return navPageBar;
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        {renderNavbar()}
      </nav>
    </div>
  )
}

export {PageNavBar}
