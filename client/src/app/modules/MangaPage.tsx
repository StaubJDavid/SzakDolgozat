import {FC, useState, useEffect, Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import Cover from './Cover';
import MangaChapters from './MangaChapters';
import CommentInput from '../common/CommentInput';
import Comments from '../common/Comments';
import Rating from '../common/Rating';
import {getManga,clearMangaSearch} from '../actions/mangaActions';
import {getSubscribedMangas} from '../actions/profileActions';
import Creator from '../common/Creator';
import CreatorButton from '../common/CreatorButton';
import getDescription from '../helpers/getDescription';
import ReactMarkdown from 'react-markdown';
import getTitle from '../helpers/getTitle';
import isEmpty from '../helpers/isEmpty';
import SubscribeToManga from './SubscribeToManga'
import authReducer from '../reducers/authReducer';

const styles = require('./markdown-styles.modules.css');

type Props = {
  manga:any,
  auth:any,
  location:any,
  history:any,
  getManga:any,
  clearMangaSearch:any,
  getSubscribedMangas:any
}

type State = {

}

class MangaPage extends Component<Props,State> {

  componentDidMount() {
    this.props.clearMangaSearch();
    if(this.props.location.state && !isEmpty(this.props.location.state)){
      console.log("Doing the link state: ", this.props.location.state.manga_id)
      this.props.getManga(this.props.location.state.manga_id);
    }else{
        let url = window.location.href;
        url = url.slice(url.lastIndexOf('/')+1,url.length);
        //console.log("Doing the not link thing: ", url)
        this.props.getManga(url);
    }

    if(this.props.auth.isAuthenticated){
      this.props.getSubscribedMangas();
    }
  }


  render(){

    let mangaPageContent = <></>

    if(this.props.manga.manga != null){
      let {data} = this.props.manga.manga;
      mangaPageContent = (
      <> 
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <div className="row">
                <div className="col-md-12">
                  <div className="p-2 rounded mt-3 bg-orange text-black own-font mb-3">
                    <div className="row">
                      <div className="col-4 col-md-3 m-auto">
                        <Cover width={100} height={100} manga_id={data.id} relationships={data.relationships} conform={true}/>
                      </div>
                    </div>
                    <div className="text-center">
                      <h1 className="display-4 text-center own-font">{getTitle(data.attributes.title)}</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="p-2 rounded mt-3 bg-orange text-black own-font mb-3">
                    <h3 className="text-center fw-bold own-font">Description</h3>
                    <hr />
                    <p className="lead px-2"><ReactMarkdown className={"reactMarkDown"} children={getDescription(data.attributes.description)} /></p>
                    <Rating manga_id={data.id} manga_name={getTitle(data.attributes.title)}/>
                    <hr />
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <div className="p-3 text-center"><div className={"fw-bold own-font"}>Target demographic</div><div className={"fw-bold fst-italic"}>{data.attributes.publicationDemographic}</div></div>
                        <div className="p-3 text-center"><div className={"fw-bold own-font"}>Status</div><div className={"fw-bold fst-italic"}>{data.attributes.status}</div></div>
                      </div>
                    </div>
                    <hr />
                    <h3 className="text-center text-black fw-bold">Genre</h3>
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                      {data.attributes.tags.map((t:any) => (t.attributes.group ==="genre"?(<>
                          <div className="p-3 fw-bold fst-italic">{t.attributes.name.en}</div>
                        </>):(<></>)                        
                        ))}
                      </div>
                    </div>
                    <hr />
                    <h3 className="text-center text-black fw-bold">Theme</h3>
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                      {data.attributes.tags.map((t:any) => (t.attributes.group ==="theme"?(<>
                          <div className="p-3 fw-bold fst-italic">{t.attributes.name.en}</div>
                        </>):(<></>)                        
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h3 className="text-center text-orange fw-bold">Alternative titles</h3>
                  <ul className="list-group">
                    {data.attributes.altTitles.map((at:any,i:number) => (
                      <li key={`titles${i}`} className="olist-group-item fw-bold">                    
                        {at[Object.getOwnPropertyNames(at)[0]]}
                      </li>
                      ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h3 className="text-center text-orange fw-bold">Extra details</h3>
                  <ul className="list-group">
                    <li key={"Author_List"} className="olist-group-item">
                      <p className="fw-bold">Author: <CreatorButton creator={data.relationships.find((o:any) => o.type === 'author')} /></p>
                      <p className="fw-bold">Artis: <CreatorButton creator={data.relationships.find((o:any) => o.type === 'artist')} /></p>
                    </li>
                  </ul>
                </div>
              </div>
              {this.props.auth.isAuthenticated?<div className='row mt-4 p-2 justify-content-center rounded'>
                <div className='col-12'>
                  <SubscribeToManga manga_id={data.id} translatedLanguage={data.attributes.availableTranslatedLanguages} />
                </div>
              </div>:<></>}
              
            </div>
          </div>
          <MangaChapters history={this.props.history} manga_id={data.id} />
        </div>
        <CommentInput target_id={data.id} />
        <Comments target_id={data.id} />
    </>
    )
    }

    return  <>
              {mangaPageContent}
            </>
  }

}

const mapStateToProps = (state:any)=>({
  manga: state.manga,
  auth: state.auth
});

export default connect(mapStateToProps,{getManga,clearMangaSearch,getSubscribedMangas})(MangaPage);