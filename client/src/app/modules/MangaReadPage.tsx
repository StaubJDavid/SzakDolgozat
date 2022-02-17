import {FC, useState, useEffect, Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import {getMangaImages, clearErrors} from '../actions/mangaActions';
import {Img} from './Img';
import CommentInput from '../common/CommentInput';
import Comments from '../common/Comments';
import MangaReadingNav from '../common/MangaReadingNav';
import NextPrevChapter from '../common/NextPrevChapter';
import { CLEAR_ERRORS } from '../actions/types';

type Props = {
  manga:any,
  errors:any,
  location:any,
  match:any,
  history:any,
  getMangaImages:any,
  clearErrors:any,
  chapter_id:any,
  chapter_hash:any,
  chapter_data:any,
  chapter_data_saver:any
}

type State = {
  ch_id:string
}

class MangaReadPage extends Component<Props,State>{
  constructor(props:any){
    super(props);

    this.state = {
      ch_id:""
    }
  }

    componentDidMount() {
      this.props.clearErrors();
      if(this.props.location.state){
        //console.log(this.props.location.state);
        this.props.getMangaImages(this.props.location.state.chapter_id);
        this.setState({ch_id: this.props.location.state.chapter_id});
      }else{
          let url = window.location.href;
          url = url.slice(url.lastIndexOf('/')+1,url.length);
          //console.log("Doing the not link thing: ", url)
          this.props.getMangaImages(url);
          this.setState({ch_id: url});
      }
    }

    componentDidUpdate(prevProps:any) {
      if(this.props.match.params.chapterid !== prevProps.match.params.chapterid){
        this.props.clearErrors();
        let url = window.location.href;
        url = url.slice(url.lastIndexOf('/')+1,url.length);
        this.props.getMangaImages(url);
        this.setState({ch_id: url});
      }
    }

  render(){

    let imageContent = <></>;

    if(this.props.errors.statusText === "Not Found"){
      this.props.history.push("/");
    }else if(this.props.manga.reading != null){
      let {chapter_id,baseUrl,chapter} = this.props.manga.reading;

      imageContent = (
        <>
          <div>{this.state.ch_id}</div>
          <MangaReadingNav location={this.props.location} history={this.props.history} chapter_id={chapter_id} />   
          <NextPrevChapter history={this.props.history} />
          <table className="table table-responsive">
              <tbody>          
              {chapter.data.map((chd:any) => (
                <tr key={chd}>
                  <td className="text-center">
                    <Img src={`${baseUrl}/data/${chapter.hash}/${chd}`} />
                  </td>
                </tr>
              ))}
              </tbody>
          </table>
          <NextPrevChapter history={this.props.history} />
          <CommentInput target_id={chapter_id} />
          <Comments target_id={chapter_id} />
        </>
      )
    }

    return (
    <>
      {imageContent}
    </>
    )
  }

}

const mapStateToProps = (state:any)=>({
  manga: state.manga,
  errors: state.errors
});

export default connect(mapStateToProps, {getMangaImages,clearErrors})(MangaReadPage);