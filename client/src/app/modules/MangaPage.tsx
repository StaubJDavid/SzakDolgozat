import {FC, useState, useEffect, Component} from 'react';
import {connect} from 'react-redux';
import Cover from './Cover';
import MangaChapters from './MangaChapters';
import CommentInput from '../common/CommentInput';
import Comments from '../common/Comments';
import Rating from '../common/Rating';
import {getManga,clearMangaSearch} from '../actions/mangaActions';
import Author from '../common/Author';

type Props = {
  manga:any,
  location:any,
  getManga:any,
  clearMangaSearch:any
}

type State = {

}

class MangaPage extends Component<Props,State> {

  componentDidMount() {
    this.props.clearMangaSearch();
    if(this.props.location.state){
      //console.log("Doing the link state: ", this.props.location.state.manga_id)
      this.props.getManga(this.props.location.state.manga_id);
    }else{
        let url = window.location.href;
        url = url.slice(url.lastIndexOf('/')+1,url.length);
        //console.log("Doing the not link thing: ", url)
        this.props.getManga(url);
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
                  <div className="card card-body bg-info text-white mb-3">
                    <div className="row">
                      <div className="col-4 col-md-3 m-auto">
                        <Cover width={100} height={100} manga_id={data.id} cover_id={data.relationships.find((o:any) => o.type === "cover_art")?data.relationships.find((o:any) => o.type === "cover_art").id:""} />
                      </div>
                    </div>
                    <div className="text-center">
                      <h1 className="display-4 text-center">{data.attributes.title.en}</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card card-body bg-light mb-3">
                    <h3 className="text-center text-info">Description</h3>
                    <p className="lead">{data.attributes.description.en}</p>
                    <Rating manga_id={data.id} manga_name={data.attributes.title.en}/>
                    <hr />
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                        <div className="p-3">Target demographic: {data.attributes.publicationDemographic}</div>
                        <div className="p-3">Status: {data.attributes.status}</div>
                      </div>
                    </div>
                    <hr />
                    <h3 className="text-center text-info">Genre</h3>
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                      {data.attributes.tags.map((t:any) => (t.attributes.group ==="genre"?(<>
                          <div className="p-3">{t.attributes.name.en}</div>
                        </>):(<></>)                        
                        ))}
                      </div>
                    </div>
                    <hr />
                    <h3 className="text-center text-info">Theme</h3>
                    <div className="row">
                      <div className="d-flex flex-wrap justify-content-center align-items-center">
                      {data.attributes.tags.map((t:any) => (t.attributes.group ==="theme"?(<>
                          <div className="p-3">{t.attributes.name.en}</div>
                        </>):(<></>)                        
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <h3 className="text-center text-info">Alternative titles</h3>
                  <ul className="list-group">
                    {data.attributes.altTitles.map((at:any,i:number) => (
                      <li key={`titles${i}`} className="list-group-item">                    
                        <p>{at[Object.getOwnPropertyNames(at)[0]]}</p>
                      </li>
                      ))}
                  </ul>
                </div>
                <div className="col-md-6">
                  <h3 className="text-center text-info">Extra details</h3>
                  <ul className="list-group">
                    <li key={"Author_List"} className="list-group-item">
                      <p>Author: <Author author_id={data.relationships.find((o:any) => o.type === 'author').id} /></p>
                      <p>Artist: <Author author_id={data.relationships.find((o:any) => o.type === 'artist').id} /></p>
                    </li>
                  </ul>
                </div>
              </div>

              
            </div>
          </div>
          <MangaChapters manga_id={data.id} />
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
  manga: state.manga
});

export default connect(mapStateToProps,{getManga,clearMangaSearch})(MangaPage);