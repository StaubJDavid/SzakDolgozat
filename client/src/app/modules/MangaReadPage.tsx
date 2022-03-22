import React,{FC, useState, useEffect, Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import {getMangaImages, clearErrors} from '../actions/mangaActions';
import {Img} from '../common/Img';
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
  ch_id:string,
  myRef:any,
  index:any
}

class MangaReadPage extends Component<Props,State>{
  constructor(props:any){
    super(props);

    this.state = {
      ch_id:"",
      myRef: [],
      index:0
    }

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onChangeChapter = this.onChangeChapter.bind(this);
    /*this.onGetImgSrc = this.onGetImgSrc.bind(this);
    this.getProxyChapter = this.getProxyChapter.bind(this);*/
  }

    componentDidMount() {
      //window.scrollTo(0, 0);
      this.setState({index: 0});
      this.setState({myRef: []});
      window.scrollTo(0,0);
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
      //window.scrollTo(0,0);
      if(this.props.match.params.chapterid !== prevProps.match.params.chapterid){
        this.props.clearErrors();
        window.scrollTo(0,0);
        let url = window.location.href;
        url = url.slice(url.lastIndexOf('/')+1,url.length);
        this.props.getMangaImages(url);
        this.setState({ch_id: url});
        this.setState({index: 0});
        this.setState({myRef: []});
      }
    }

    onChangeChapter(e:any){
      let currentIndex = this.props.manga.reading_chapters.chapter.array_id;
      //console.log(currentIndex+Number(e.target.value));

      this.props.history.push(`/manga/read/${this.props.manga.reading_chapters.chapters[currentIndex+Number(e)].id}`,
      {chapter_id: this.props.manga.reading_chapters.chapters[currentIndex+Number(e)].id}
      );
    }

    //src={`${baseUrl}/data/${chapter.hash}/${chd}`}
    /*getProxyChapter(baseurl:string,hash:string,filename:string) {
      return axios.get(`http://80.98.214.13:3000/chapter/${baseurl}/${hash}/${filename}`)
    }

    async onGetImgSrc(baseurl:any,hash:any,filename:any){
      const ownResponse = await this.getProxyChapter(baseurl, hash, filename);
      //this.setState({data:ownResponse.data.url});
      return ownResponse.data.url;
    }*/

    onKeyPressed(e:any) {
      //const scrollToRef = (ref:any) => window.scrollTo(0, ref.offsetTop)
      e.preventDefault();
      //console.log(this.state.myRef);
      //console.log(e.key);
      let localIndex = this.state.index;
      console.log(localIndex);
      let length = this.props.manga.reading.chapter.data.length;
      console.log(length);
      if(e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "s" || e.key === "d" || e.key === " "){
        console.log("NEXT");
        //console.log(this.state.myRef[0]);
        if(localIndex < length-1){
          localIndex++;
          window.scrollTo(0, this.state.myRef[localIndex].offsetTop);
          this.setState({index:localIndex});
        }else{
          /*localIndex = 0;
          window.scrollTo(0, this.state.myRef[localIndex].offsetTop);
          this.setState({index:localIndex});*/
          let {chapter} = this.props.manga.reading_chapters;
          if(chapter.array_id===0){
            this.props.history.push(`/manga/${chapter.manga_id}`);
          }else{
            this.onChangeChapter(-1);
          }
        }
      }

      if(e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "w" || e.key === "a"){
        console.log("PREVIOUS");
        //console.log(this.state.myRef[0]);
        if(localIndex > 0){
          localIndex--;
          console.log(localIndex);
          console.log(this.state.myRef[localIndex]);
          //this.state.myRef[localIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.scrollTo(0, this.state.myRef[localIndex].offsetTop);
          this.setState({index:localIndex});
        }else{
          let {chapter,chapters} = this.props.manga.reading_chapters;
          let max = chapters.length-1;
          if(chapter.array_id===max){

          }else{
            this.onChangeChapter(1);
          }
        }
      }
      //this.state.ref.current.scrollIntoView()
    }

  render(){

    let imageContent = <></>;

    if(this.props.errors.statusText === "Not Found"){
      this.props.history.push("/");
    }else if(this.props.manga.reading != null){
      let {chapter_id,baseUrl,chapter} = this.props.manga.reading;

      imageContent = (
        <>
            <div className="text-center my-2">
              <MangaReadingNav location={this.props.location} history={this.props.history} chapter_id={chapter_id} />   
            </div>

            <div className="text-center mb-2">
              <NextPrevChapter history={this.props.history} />
            </div>

            <div className="text-center">
              {chapter.data.map((chd:any, i:any) => {
                return (
                  /*<>
                  <img 
                    ref={(ref) => {if(ref !== null)this.state.myRef.push(ref)}}
                    className='mb-3'
                    style={{maxWidth:"100%",maxHeight:"100vh",height:"auto"}}
                    src={this.onGetImgSrc(baseUrl,chapter.hash,chd)}
                    `${baseUrl}/data/${chapter.hash}/${chd}`
                    alt="Waaaa">
                  </img>
                  <br />
                  </>*/
                  <Img ref={(ref:any) => {if(ref !== null)this.state.myRef.push(ref)}}
                    baseUrl={baseUrl}
                    hash={chapter.hash}
                    chd={chd}
                  />
                )})}
            </div>

            <div className="text-center">
              <NextPrevChapter history={this.props.history} />
            </div>
            <div className="text-center my-2">
              <MangaReadingNav location={this.props.location} history={this.props.history} chapter_id={chapter_id} />   
            </div>

            <div>
              <CommentInput target_id={chapter_id} />
            </div>
          
            <div>
            <Comments target_id={chapter_id} />
            </div>

        </>
      )
    }

    return (
      <div style={{outline:"none"}} className='container-fluid m-0 p-0 border-0' onKeyDown={this.onKeyPressed} tabIndex={-1}>
      {imageContent}
      </div>
    )
  }

}

const mapStateToProps = (state:any)=>({
  manga: state.manga,
  errors: state.errors
});

export default connect(mapStateToProps, {getMangaImages,clearErrors})(MangaReadPage);