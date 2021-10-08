import {FC, useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from "react-router-dom";
import { PageNavBar } from './PageNavBar';

type Props = {
  manga_id: string
}

function getMangaChapters(manga_id:string, offset:number) {
  return axios.get<{data:any, result: any, limit: any, total:any, offset:any}>(`https://api.mangadex.org/manga/${manga_id}/feed?order[volume]=desc&order[chapter]=desc&offset=${offset}`)
}

const MangaChapters: FC<Props> = ({manga_id}) => {
  const history = useHistory();

  const [data, setData] = useState<[any]>();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState<any>();
  const [offset, setOffset] = useState<any>();
  const [result, setResult] = useState<any>();
  const [total, setTotal] = useState<any>();
  const [isLoading, setLoading] = useState(true);

  function nav(_chapter_id:any, _chapter_hash:any, _chapter_data:any, _chapter_data_saver:any) {
    history.push({
      pathname: `/manga/read/${_chapter_id}`,
      state: {
        chapter_id: _chapter_id,
        chapter_hash: _chapter_hash,
        chapter_data: _chapter_data,
        chapter_data_saver: _chapter_data_saver
      }
    });
  }
  
  // const [showSplashScreen, setShowSplashScreen] = useState(true)
  useEffect(() => {
      const Data = async () => {
        try {
          const response = await getMangaChapters(manga_id,0*100);
          // console.log("MangaChapt");
          // console.log(response.data);
          setCurrentPage(1);
          setData(response.data.data);
          setLimit(response.data.limit);
          setOffset(response.data.offset);
          setResult(response.data.result);
          setTotal(response.data.total);

          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      }
  
      Data()
    }, []);

  function handlePage(page:number) {
    console.log(`Page number: ${page}`);
    setLoading(true);
    setCurrentPage(page);

    getMangaChapters(manga_id,(page - 1)*100)
    .then(({data}) => {
      // console.log(data.data);
      setData(data.data);
      setLimit(data.limit);
      setOffset(data.offset);
      setResult(data.result);
      setTotal(data.total);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error.response.status);     
      setLoading(true);   
    })
  }

  return isLoading ? <></> : (
    <>   
        <table>
            <tbody>
            {data!.map((ch:any) => (
              <tr key={ch.id}>
                <td>
                  Volume: {ch.attributes.volume}
                </td>
                <td>
                  Chapter: {ch.attributes.chapter}
                </td>
                <td onClick={() => {nav(ch.id, ch.attributes.hash, ch.attributes.data, ch.attributes.dataSaver);}}>
                  Title: {ch.attributes.title === null ? ("Chapter " + ch.attributes.chapter):ch.attributes.title}
                </td>
                <td>
                  Language: {ch.attributes.translatedLanguage}
                </td>
              </tr>
            ))}
            </tbody>
        </table>
        {isLoading === false && (<PageNavBar passedFc={handlePage} currentPage={currentPage} total={total} limit={limit} maxPage={Math.trunc(total/limit) + 1} />)}
    </>
  )

  
}

export {MangaChapters}