import {FC, useState, useEffect} from 'react'
import axios from 'axios'
import { useLocation } from "react-router-dom";
import {Img} from './Img';

type Props = {
  chapter_id:any,
  chapter_hash:any,
  chapter_data:any,
  chapter_data_saver:any
}


function getMangaServer(chapter_id:any) {
  return axios.get<{baseUrl:any, result: any}>(`https://api.mangadex.org/at-home/server/${chapter_id}`)
}

const MangaReadPage: FC = (props) => {
  const location:any = useLocation();
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


  return isLoading ? <></> : (
    <>   
        <table className="table table-responsive">
            <tbody>          
            {data.chapter.data.map((chd:any) => (
              <tr key={chd}>
                <td className="text-center">
                  <Img src={`${data.baseUrl}/data/${data.chapter.hash}/${chd}`} />
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </>
  )

  
}

export {MangaReadPage}