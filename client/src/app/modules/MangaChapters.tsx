import {FC, useState, useEffect, Component} from 'react'
import {connect, useDispatch} from 'react-redux';
import ISO6391 from 'iso-639-1';
import {Link} from "react-router-dom";
import { PageNavBar } from './PageNavBar';
import {getChapters, setCurrentPage} from '../actions/mangaActions';
import ReadChapterButton from '../common/ReadChapterButton';

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
              <tr>
                <th className="text-center">Volume</th>
                <th className="text-center">Chapter</th>
                <th className="text-left">Chapter Name</th>
                <th className="text-center">Scanlation group</th>
                <th className="text-center">Language</th>
              </tr>
              {data.map((ch:any) => {
                let scangroup:any = ch.relationships.find((o:any) => o.type === 'scanlation_group');
                //console.log(scangroup);
                return (
                <tr key={ch.id}>
                  <td className="text-center align-middle">
                    Volume: {ch.attributes.volume}
                  </td>
                  <td className="text-center align-middle">
                    Chapter: {ch.attributes.chapter}
                  </td>
                  <td className="text-left align-middle">
                    <ReadChapterButton chapter={ch} />
                  </td>
                  <td className="text-center align-middle">
                    {scangroup?<Link
                      to={{
                          pathname: `/scangroup/${scangroup.id}`,
                          state: {
                              scangroup: scangroup
                          }
                      }}><p className="text-center align-middle">{scangroup.attributes.name}</p></Link>:<p className="text-center align-middle">No Group</p>}
                  </td>
                  <td className="text-center align-middle">
                    {ISO6391.getName(ch.attributes.translatedLanguage)}
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
