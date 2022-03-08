import {FC, useState, useEffect, Component} from 'react'
import axios from 'axios'
import store from '../store';
import { AnyIfEmpty } from 'react-redux';
import { timingSafeEqual } from 'crypto';

type Props = {
  manga_id: string,
  relationships: any,
  width: number,
  height: number,
  conform: boolean
}

type State = {
  isLoading:boolean,
  data:any
}

function getCover(manga_id:string) {
  return axios.get<{data:any, result: any}>(`${process.env.REACT_APP_PROXY_URL}/manga/${manga_id}?includes[]=cover_art`)
}

function changeRes(url:string,res:string){
  switch(res){
    case "512": url = url + ".512.jpg"; break;
    case "256": url = url + ".256.jpg"; break;
    case "og": break;
    default: break;
  }
  return url;
}

class Cover extends Component<Props,State> {
  constructor(props:any){
    super(props);

    this.state = {
      isLoading:true,
      data:""
    }
    
  }

  async componentDidMount(){
    try {
      let cover = this.props.relationships.find((o:any) => o.type === "cover_art")
      if(cover){
        this.setState({data:`https://uploads.mangadex.org/covers/${this.props.manga_id}/${cover.attributes.fileName}`});
        this.setState({isLoading:false});
      }else{
        if(this.props.relationships.length !== 0){
          this.setState({data:`https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg`});
          this.setState({isLoading:false});
        }else{
          const response = await getCover(this.props.manga_id);
          let rcover = response.data.data.relationships.find((o:any) => o.type === "cover_art");
          if(rcover){
            this.setState({data:`https://uploads.mangadex.org/covers/${this.props.manga_id}/${rcover.attributes.fileName}`});
            this.setState({isLoading:false});
          }else{
            this.setState({data:`https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg`});
            this.setState({isLoading:false});
          }
        }
      }
    } catch (error) {
      console.log(error)
      store.dispatch({
        type:"GET_ERRORS",
        payload:error
      })
    }
  }

  async componentDidUpdate(prevProps:any){
    if(this.props.relationships !== prevProps.relationships){
      try {
        let cover = this.props.relationships.find((o:any) => o.type === "cover_art")
        if(cover){
          this.setState({data:`https://uploads.mangadex.org/covers/${this.props.manga_id}/${cover.attributes.fileName}`});
          this.setState({isLoading:false});
        }else{
          if(this.props.relationships.length !== 0){
            this.setState({data:`https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg`});
            this.setState({isLoading:false});
          }else{
            const response = await getCover(this.props.manga_id);
            let rcover = response.data.data.relationships.find((o:any) => o.type === "cover_art");
            if(rcover){
              this.setState({data:`https://uploads.mangadex.org/covers/${this.props.manga_id}/${rcover.attributes.fileName}`});
              this.setState({isLoading:false});
            }else{
              this.setState({data:`https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg`});
              this.setState({isLoading:false});
            }
          }
        }
      } catch (error) {
        console.log(error);
        store.dispatch({
          type:"GET_ERRORS",
          payload:error
        })
      }
    }
  }

  render(){

    return (
      <>
      {this.state.isLoading ? <></> : (
      <>   
          {
          this.props.conform?
          <img height={`${this.props.height}%`} width={`${this.props.width}%`} src={this.state.data} alt="Waaaa"></img>:
          <img height={`${this.props.height}%`} src={this.state.data} alt="Waaaa"></img>
          }
      </>)}
      </>
    )
  }
  
}

export default Cover;