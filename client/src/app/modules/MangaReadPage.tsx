import {FC, useState, useEffect, Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import { useLocation } from "react-router-dom";
import {getMangaImages} from '../actions/mangaActions';
import {Img} from './Img';
import CommentInput from '../common/CommentInput';
import Comments from '../common/Comments';

type Props = {
  manga:any,
  location:any,
  getMangaImages:any,
  chapter_id:any,
  chapter_hash:any,
  chapter_data:any,
  chapter_data_saver:any
}

type State = {
}


function getMangaServer(chapter_id:any) {
  return axios.get<{baseUrl:any, result: any}>(`https://api.mangadex.org/at-home/server/${chapter_id}`)
}

class MangaReadPage extends Component<Props,State>{
  /*const location:any = useLocation();
  //const {chapter_id, chapter_hash, chapter_data, chapter_data_saver} = location.state;
  const [chapter_id, setChapterId] = useState<any>(location.state.chapter_id);
  const [chapter_hash, setChapterHash] = useState<any>(location.state.chapter_hash);
  const [chapter_data, setChapterData] = useState<[any]>(location.state.chapter_data);
  const [chapter_data_saver, setChapterDataSaver] = useState<[any]>(location.state.chapter_data_saver);

  const [isLoading, setLoading] = useState(true);
  // const [showSplashScreen, setShowSplashScreen] = useState(true)
  const [data, setData] = useState<any>();
  useEffect(() => {
      const Data = async () => {
        try {
          
          const response = await getMangaServer(chapter_id);
          console.log("MangaRead");
          console.log(response.data);
          setData(response.data);
          // console.log(data);
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
  
      Data()
    }, []);
  */

    componentDidMount() {
      if(this.props.location.state){
        this.props.getMangaImages(this.props.location.state.chapter_id);
      }else{
          let url = window.location.href;
          url = url.slice(url.lastIndexOf('/')+1,url.length);
          //console.log("Doing the not link thing: ", url)
          this.props.getMangaImages(url);
      }
    }

  render(){

    let imageContent = <></>;

    if(this.props.manga.reading != null){
      let {chapter_id,baseUrl,chapter} = this.props.manga.reading;

      imageContent = (
        <>   
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
  manga: state.manga
});

export default connect(mapStateToProps, {getMangaImages})(MangaReadPage);