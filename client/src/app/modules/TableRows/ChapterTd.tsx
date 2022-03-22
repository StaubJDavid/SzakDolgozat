import {FC,useState} from 'react'
import Chapter from './Chapter';
import classnames from 'classnames';
import '../../App.css';

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
      style={{"backgroundColor":hover && hoverEnabled?"#ffee0a":"#ffcc00"}}
      onClick={() => onClick(onClickData)}
      className={classnames(classname,{"pointer-style":pointer})}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {text}
    </td>           
  )
}

export default ChapterTd;
