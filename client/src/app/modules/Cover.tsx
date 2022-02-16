import {FC, useState, useEffect, Component} from 'react'
import axios from 'axios'
import store from '../store';

type Props = {
  manga_id: string,
  cover_id: string,
  width: number,
  height: number
}

type State = {
  isLoading:boolean,
  data:any
}

function getCover(cover_id:string) {
  return axios.get<{data:any, result: any}>(`${process.env.REACT_APP_PROXY_URL}/cover/${cover_id}`)
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
  /*const [isLoading, setLoading] = useState(true);
  // const [showSplashScreen, setShowSplashScreen] = useState(true)
  const [data, setData] = useState<any>();
  useEffect(() => {
      const Data = async () => {
        try {
          const response = await getCover(cover_id);
          console.log('Cover response: ',response.data);
          console.log(`https://uploads.mangadex.org/covers/${manga_id}/${response.data.data.attributes.fileName}`)
          setData(`https://uploads.mangadex.org/covers/${manga_id}/${response.data.data.attributes.fileName}`);
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
  
      Data()
    }, []);*/
    async componentDidMount(){
      try {
        if(this.props.cover_id === ""){
          this.setState({data: "https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg"})
          this.setState({isLoading:false});
        }else{
          //const response = await getCover(this.props.cover_id);++
          //console.log('Cover response: ',response.data);
          //console.log(`https://uploads.mangadex.org/covers/${this.props.manga_id}/${response.data.data.attributes.fileName}`)++
          //this.setState({data:`https://uploads.mangadex.org/covers/${this.props.manga_id}/${response.data.data.attributes.fileName}`});
          this.setState({data: "https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg"})
          this.setState({isLoading:false});
        }
        //console.log(this.props.cover_id);
      } catch (error) {
        store.dispatch({
          type:"GET_ERRORS",
          payload:error
        })
      }
    }

    async componentDidUpdate(prevProps:any){
      if (this.props.cover_id !== prevProps.cover_id) {
        try {
          if(this.props.cover_id === ""){
            this.setState({data: "https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg"})
            this.setState({isLoading:false});
          }else{
            //const response = await getCover(this.props.cover_id);++
            //console.log('Cover response: ',response.data);
            //console.log(`https://uploads.mangadex.org/covers/${this.props.manga_id}/${response.data.data.attributes.fileName}`)
            //this.setState({data:`https://uploads.mangadex.org/covers/${this.props.manga_id}/${response.data.data.attributes.fileName}`});++
            this.setState({data: "https://mangadex.org/_nuxt/img/cover-placeholder.d12c3c5.jpg"})
            this.setState({isLoading:false});
          }
          //console.log(this.props.cover_id);
        } catch (error) {
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
          <img width={`${this.props.width}%`} height={`${this.props.height}%`} src={this.props.cover_id===""?this.state.data:changeRes(this.state.data,"og")} alt="Waaaa"></img>
      </>)}
      </>
    )
  }
  
}

export default Cover;