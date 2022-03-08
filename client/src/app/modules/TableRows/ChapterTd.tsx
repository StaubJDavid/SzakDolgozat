/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC,useState} from 'react'
import Chapter from './Chapter';
import classnames from 'classnames';

type Props = {
  hover:boolean,
  pointer:boolean,
  onClick:any,
  onClickData:any,
  text:string,
  classname:string,
  onHover:any,
  hoverEnabled:boolean
}

const ChapterTd: FC<Props> = ({hover,hoverEnabled,pointer,onClick,onClickData,text,onHover,classname}) => {
  //const [hover,setHover] = useState(false);

  return (
    <td 
      style={pointer?{cursor:"pointer"}:{}}
      onClick={() => onClick(onClickData)}
      className={classnames(classname,{"bg-light":hover && hoverEnabled})}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {text}
    </td>           
  )
}

export default ChapterTd;
