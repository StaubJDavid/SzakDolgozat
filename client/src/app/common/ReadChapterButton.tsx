import {FC} from 'react';
import {Link} from "react-router-dom";
import getChapterTitle from '../helpers/getChapterTitle';

type Props = {
    chapter:any
}

const ReadChapterButton: FC<Props> = ({chapter}) => {
    if(chapter.attributes.externalUrl === null){
        return (
            <Link className="text-center"
                to={{
                    pathname: `/manga/read/${chapter.id}`,
                    state: {
                        chapter_id: chapter.id
                    }
                }}>{getChapterTitle(chapter.attributes)}</Link>
        )
    }else{
        return (<a className="text-center" href={chapter.attributes.externalUrl}>{getChapterTitle(chapter.attributes)}</a>)
    } 
}


export default ReadChapterButton;