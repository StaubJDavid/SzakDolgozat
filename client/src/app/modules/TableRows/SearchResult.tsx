/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, Component, useState} from 'react';
import Cover from '../Cover';
import {Link, useHistory} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';
import '../../App.css';
import isEmpty from '../../helpers/isEmpty';

type Props = {
  id: string,
  title: string,
  status: string,
  relationships: any,
  demography:any,
  description:any,
  desc_length:number
}

type State = {}

const SearchResult: FC<Props> = ({id,title,status,relationships,demography,description,desc_length}) => {
  const history = useHistory();
  const [linkHover, setLinkHover] = useState(false);
  
  let desc = "";
  
  if(description.hasOwnProperty('en')){
    if(description.en.length < desc_length){
      desc = description.en;
    }else{
      desc = description.en.slice(0,desc_length) + "...";
    }
    
  }else{
    /*console.log("Has no en: ");
    console.log(id);*/
    if(isEmpty(description)){
      desc = "No description found";
    }else {
      if(description[Object.keys(description)[0]].length < desc_length){
        desc = description[Object.keys(description)[0]]
      }else{
        desc = description[Object.keys(description)[0]].slice(0,desc_length) + "...";
      }
    }
    
  }
  
  return (
    <div className={classnames("p-2 rounded mb-2 text-black fw-bold pointer-style",{"bg-yellow":linkHover,"bg-orange":!linkHover})}
      onClick={() => history.push(`/manga/${id}`,{manga_id: id})}
      onMouseEnter={() => setLinkHover(true)}
      onMouseLeave={() => setLinkHover(false)}
    >
      <div className="row justify-content-md-center">
        <div className="d-flex justify-content-center col-md-2 align-self-center">
          <Cover height={100} width={100} manga_id={id} relationships={relationships} conform={true}/>
        </div>
        <div className="col-md-3 align-self-center">
          <div className="row justify-content-md-center">
            <div className="col-md-12 align-self-center text-center mb-4">
              {title}
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-md-12 align-self-center text-center mb-4">
              {status}
            </div>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-md-12 align-self-center text-center mb-4">
              {demography}
            </div>
          </div>
        </div>
        {description!==""?(<div className="col-md-7 align-self-center">
          <p className="align-middle"><ReactMarkdown children={desc} /></p>
        </div>):(<></>)}
      </div>
    </div>               
  )
}


export default SearchResult;
