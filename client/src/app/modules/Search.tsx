import { Component, useState, FC} from 'react'
import {connect, useDispatch} from 'react-redux';
import axios from 'axios'
import {useHistory } from 'react-router-dom'
import { PageNavBar } from './PageNavBar';
import SearchResult from './TableRows/SearchResult';
import SearchBar from '../common/SearchBar';
import {searchForMangaPage, setCurrentPage} from '../actions/mangaActions';
import isEmpty from '../helpers/isEmpty';

/*function getMangas(title:string, offset:number) {
  return axios.get<{data:any, limit:any, offset:any, response:any, result: any, total:any}>('https://api.mangadex.org/manga', {params: {title: title, limit: 20, offset: offset}})
}*/

type Props = {
  auth:any,
  errors:any,
  manga:any,
  searchForMangaPage:any,
  setCurrentPage:any
}

type State = {
}

class Search extends Component<Props,State> {
  constructor(props:any){
    super(props);

    this.state = {
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(page:number) {
    //console.log(`Page number: ${page}`);
    this.props.setCurrentPage(page);
    /*console.log("CurrentPage: ", this.props.manga.manga_search.currentPage);
    console.log("Offset: ",(page-1)*20);*/

    this.props.searchForMangaPage(this.props.manga.manga_search.manga_name,(page-1)*20,page)
  }

  render() {
    let mangaSearchContent = <></>;

    if(!isEmpty(this.props.manga.manga_search)){
      const {data,limit,total} = this.props.manga.manga_search;
      const currentPage = this.props.manga.currentPage;

      if(data.length === 0){
        mangaSearchContent = (
        <div className="d-flex flex-column justify-content-center">
          No Results Found
        </div>);
      }else{
        mangaSearchContent = (
          <>
          <div className="d-flex flex-column justify-content-center">
            <div className="posts">
                    {data.map((d:any) => (
                      <SearchResult id={d.id} demography={d.attributes.publicationDemographic} description={d.attributes.description.en} title={d.attributes.title.en} status={d.attributes.status} relationships={d.relationships}/>
                    ))}                  
              </div>
              <PageNavBar passedFc={this.handleSearch} currentPage={currentPage} total={total} limit={limit} maxPage={Math.trunc(total/limit) + 1} />
          </div>
          </>
          )
      }
    }

    return (
      <>
      <SearchBar />
      {mangaSearchContent}
      </>
    )
  }
}

const mapStateToProps = (state:any)=>({
  auth: state.auth,
  errors: state.errors,
  manga: state.manga
});

export default connect(mapStateToProps, {searchForMangaPage,setCurrentPage})(Search);
