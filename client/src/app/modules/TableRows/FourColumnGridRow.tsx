/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import Chapter from './Chapter';

type Props = {
  chapters:any,
  index:any
}

const FourColumnGridRow: FC<Props> = ({chapters,index}) => {
  let cols = [];

  for (var i = index; i < index+4; i++) {
    cols.push(<div className="col-md-3 border border-dark text-center p-1 "><Chapter key={"mfm"+chapters[i].id} chapter={chapters[i]} /></div>);
  }

  return (
    <div className="row">
      {cols}
    </div>            
  )
}

export default FourColumnGridRow;

