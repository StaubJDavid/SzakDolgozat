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
        <div className='text-center mb-5'>
        <div >
            <Cover height={25} width={25} manga_id={relationship.id} relationships={[]} conform={true}/>
        </div>
        <h3 style={{cursor:"pointer"}} data-bs-toggle="collapse" data-bs-target={`#collapseDescription${relationship.id}`} aria-controls={`collapseDescription${relationship.id}`}>{getTitle(relationship.attributes.title)}</h3>
        <button onClick={() => {history.push('/manga/'+ relationship.id,{})}} className="btn btn-dark">Go To Manga Page</button>
        <div className="collapse" id={`collapseDescription${relationship.id}`}>
            <p className="lead"><ReactMarkdown children={getDescription(relationship.attributes.description)} /></p>
        </div>
        </div>
        
    )
}

export default CreatorManga;