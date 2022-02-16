import {FC, useState, useEffect, Component} from 'react'
import {connect, useDispatch} from 'react-redux';
import ISO6391 from 'iso-639-1';
import {Link} from "react-router-dom";
import { PageNavBar } from './PageNavBar';
import {getChapters, setCurrentPage} from '../actions/mangaActions';

type Props = {
  manga:any,
  manga_id: string,
  getChapters:any,
  setCurrentPage:any
}

type State = {
}

/*function getMangaChapters(manga_id:string, offset:number) {
  return axios.get<{data:any, result: any, limit: any, total:any, offset:any}>(`${process.env.REACT_APP_PROXY_URL}/manga/${manga_id}/feed?order[volume]=desc&order[chapter]=desc&offset=${offset}`)
}*/

class MangaChapters extends Component<Props,State> {
  constructor(props:any){
    super(props);

    this.state = {
    }
    this.handlePage = this.handlePage.bind(this);
  }

  componentDidMount() {
    this.props.setCurrentPage(1);
    this.props.getChapters(this.props.manga_id, 0);
  }

  componentDidUpdate(prevProps:any) {
    if (this.props.manga_id !== prevProps.manga_id) {
      this.props.setCurrentPage(1);
      this.props.getChapters(this.props.manga_id, 0);
    }
  }

  handlePage(page:number) {
    //console.log(`Page number: ${page}`);
    this.props.setCurrentPage(page);
    /*console.log("CurrentPage: ", this.props.manga.manga_search.currentPage);
    console.log("Offset: ",(page-1)*20);*/

    this.props.getChapters(this.props.manga.manga.data.id,(page-1)*100,page)
  
  }

  render() {
    let chaptersContent = <></>;

    if(this.props.manga.chapters != null){
      let {data, limit, total} = this.props.manga.chapters;
      let currentPage = this.props.manga.currentPage;

      chaptersContent = (
        <>   
          <table className="table table-responsive">
              <tbody>
              {data.map((ch:any) => {
                let scangroup:any = ch.relationships.find((o:any) => o.type === 'scanlation_group');
                console.log(scangroup);
                return (
                <tr key={ch.id}>
                  <td>
                    Volume: {ch.attributes.volume}
                  </td>
                  <td>
                    Chapter: {ch.attributes.chapter}
                  </td>
                  <td>
                    <Link className="text-center"
                    to={{
                      pathname: `/manga/read/${ch.id}`,
                      state: {
                        chapter_id: ch.id
                      }
                    }}>{ch.attributes.title === "" || ch.attributes.title === null ? ("Chapter " + ch.attributes.chapter):ch.attributes.title}</Link>
                  </td>
                  <td>
                    {scangroup?<Link className="text-center"
                      to={{
                          pathname: `/scangroup/${scangroup.id}`,
                          state: {
                              scangroup: scangroup
                          }
                      }}>{scangroup.attributes.name}</Link>:<>No Group</>}
                  </td>
                  <td>
                    Language: {ISO6391.getName(ch.attributes.translatedLanguage)}
                  </td>
                </tr>
              )})}
              </tbody>
          </table>
          <PageNavBar passedFc={this.handlePage} currentPage={currentPage} total={total} limit={limit} maxPage={Math.trunc(total/limit) + 1} />
      </>
      )
    }

    return (
      <>
        {chaptersContent}
      </>
    )
  }  
}

const mapStateToProps = (state:any)=>({
  manga: state.manga
});

export default connect(mapStateToProps, {getChapters,setCurrentPage})(MangaChapters);
