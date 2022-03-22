import {FC, useState, useEffect, Component} from 'react'
import {connect, useDispatch} from 'react-redux';
import ISO6391 from 'iso-639-1';
import {Link, withRouter} from "react-router-dom";
import { PageNavBar } from './PageNavBar';
import {getChapters, setCurrentPage} from '../actions/mangaActions';
import ReadChapterButton from '../common/ReadChapterButton';
import getChapterTitle from '../helpers/getChapterTitle';
import ChapterTd from './TableRows/ChapterTd';
import ChapterRow from './TableRows/ChapterRow';

type Props = {
  manga:any,
  manga_id: string,
  getChapters:any,
  setCurrentPage:any,
  history:any
}

type State = {
  chapterHover:boolean,
  scanHover:boolean
}

/*function getMangaChapters(manga_id:string, offset:number) {
  return axios.get<{data:any, result: any, limit: any, total:any, offset:any}>(`${process.env.REACT_APP_PROXY_URL}/manga/${manga_id}/feed?order[volume]=desc&order[chapter]=desc&offset=${offset}`)
}*/

class MangaChapters extends Component<Props,State> {
  constructor(props:any){
    super(props);

    this.state = {
      chapterHover:false,
      scanHover:false
    }
    this.handlePage = this.handlePage.bind(this);
    this.onReadChapterClick = this.onReadChapterClick.bind(this);
    this.onScanGroupClick = this.onScanGroupClick.bind(this);
    this.onChapterHover = this.onChapterHover.bind(this);
    this.onScanHover = this.onScanHover.bind(this);
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
    this.props.setCurrentPage(page);
    this.props.getChapters(this.props.manga.manga.data.id,(page-1)*100,page)
  
  }

  onReadChapterClick(ch:any) {
    if(ch.attributes.externalUrl === null){
      this.props.history.push(`/manga/read/${ch.id}`,{chapter_id: ch.id})
    }else{
        //this.props.history.push(ch.attributes.externalUrl)
        window.location.replace(ch.attributes.externalUrl)
    } 
  }

  onScanGroupClick(scangroup:any) {
    if(scangroup){
      this.props.history.push(`/scangroup/${scangroup.id}`,{scangroup: scangroup})
    }
  }

  onChapterHover(hover:boolean) {
    this.setState({chapterHover:hover});
  }

  onScanHover(hover:boolean) {
    this.setState({scanHover:hover});
  }

  render() {
    let chaptersContent = <></>;

    if(this.props.manga.chapters != null){
      let {data, limit, total} = this.props.manga.chapters;
      let currentPage = this.props.manga.currentPage;

      chaptersContent = (
        <>   
          <table className="table table-responsive rounded mt-4">
              <tbody>
              <tr className='bg-orange-dark own-font'>
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
                  <ChapterRow
                    scangroup={scangroup}
                    ch={ch}
                    onReadChapterClick={this.onReadChapterClick}
                    onScanGroupClick={this.onScanGroupClick}
                  />
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
