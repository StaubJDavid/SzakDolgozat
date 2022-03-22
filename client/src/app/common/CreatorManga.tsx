import React, {FC,useState} from 'react'
import classnames from 'classnames'
import {useHistory} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap/js/src/collapse.js";
import getDescription from '../helpers/getDescription';
import getTitle from '../helpers/getTitle';
import Cover from '../modules/Cover';
import ReactMarkdown from 'react-markdown';

type Props = {
    relationship:any
}

const CreatorManga: FC<Props> = ({relationship}) => {
    const history = useHistory();
    const [hover, setHover] = useState(false);


    return(
        <div className='mb-5 bg-orange p-2 rounded'>
        <div className='text-center'>
            <Cover height={25} width={25} manga_id={relationship.id} relationships={[]} conform={true}/>
        </div>
        <h3 className='fw-bold own-font my-2 text-center' style={{cursor:"pointer"}} data-bs-toggle="collapse" data-bs-target={`#collapseDescription${relationship.id}`} aria-controls={`collapseDescription${relationship.id}`}>{getTitle(relationship.attributes.title)}</h3>
        <div className='text-center'><button onClick={() => {history.push('/manga/'+ relationship.id,{})}} className="btn-black">Go To Manga Page</button></div>
        <div className="collapse" id={`collapseDescription${relationship.id}`}>
            <p className="lead bg-black rounded p-4 text-white fw-bold mt-2 text-left"><ReactMarkdown className={"reactMarkDownBlack text-left"} children={getDescription(relationship.attributes.description)} /></p>
        </div>
        </div>
        
    )
}

export default CreatorManga;