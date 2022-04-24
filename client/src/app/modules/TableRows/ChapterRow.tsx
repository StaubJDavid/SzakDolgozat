/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC,useState} from 'react'
import Chapter from './Chapter';
import classnames from 'classnames';
import ChapterTd from './ChapterTd';
import ISO6391 from 'iso-639-1';
import getChapterTitle from '../../helpers/getChapterTitle';

type Props = {
  scangroup:any,
  ch:any,
  onReadChapterClick:any,
  onScanGroupClick:any
}

const getVolume = (volume:any) => {
  if(volume){
    return "Volume: " + volume;
  }else{
    return "Volume: ";
  }
}
//"Volume: "+ch.attributes.volume===null?"":ch.attributes.volume

const ChapterRow: FC<Props> = ({scangroup,ch,onReadChapterClick,onScanGroupClick}) => {
  const [chapterHover,setChapterHover] = useState(false);
  const [scangroupHover,setScangroupHover] = useState(false);

  return (
    <tr key={ch.id} className="fw-bold">
      <ChapterTd 
        hover={chapterHover}
        hoverEnabled={true}
        pointer={true}
        onClick={onReadChapterClick}
        onClickData={ch}
        text={getVolume(ch.attributes.volume)}
        onHover={setChapterHover}
        classname={"text-center align-middle"}
      />
      <ChapterTd 
        hover={chapterHover}
        hoverEnabled={true}
        pointer={true}
        onClick={onReadChapterClick}
        onClickData={ch}
        text={"Chapter: "+ch.attributes.chapter}
        onHover={setChapterHover}
        classname={"text-center align-middle"}
      />
      <ChapterTd 
        hover={chapterHover}
        hoverEnabled={true}
        pointer={true}
        onClick={onReadChapterClick}
        onClickData={ch}
        text={getChapterTitle(ch.attributes)}
        onHover={setChapterHover}
        classname={"text-left align-middle"}
      />
      <ChapterTd 
        hover={scangroupHover}
        hoverEnabled={scangroup?true:false}
        pointer={scangroup?true:false}
        onClick={onScanGroupClick}
        onClickData={scangroup}
        text={scangroup?scangroup.attributes.name:"No Group"}
        onHover={setScangroupHover}
        classname={"text-center align-middle"}
      />
      <ChapterTd 
        hover={false}
        hoverEnabled={false}
        pointer={false}
        onClick={() => {}}
        onClickData={{}}
        text={ISO6391.getName(ch.attributes.translatedLanguage)}
        onHover={() => {}}
        classname={"text-center align-middle"}
      />
    </tr>        
  )
}

export default ChapterRow;
