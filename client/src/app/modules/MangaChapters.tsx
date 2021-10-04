/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState, useEffect} from 'react'
import axios from 'axios'
import {useHistory} from "react-router-dom";

type Props = {
  manga_id: string
}

function getMangaChapters(manga_id:string, offset:number) {
  return axios.get<{data:any, result: any, limit: any, total:any, offset:any}>(`https://api.mangadex.org/manga/${manga_id}/feed?order[volume]=desc&order[chapter]=desc&offset=${offset}`)
}

const MangaChapters: FC<Props> = ({manga_id}) => {
  const history = useHistory();

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
  const [isLoading, setLoading] = useState(true);
  // const [showSplashScreen, setShowSplashScreen] = useState(true)
  const [data, setData] = useState<any>();
  useEffect(() => {
      const Data = async () => {
        try {
          const response = await getMangaChapters(manga_id,0*100);
          // console.log("MangaChapt");
          // console.log(response.data);
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
        <table>
            <tbody>
            <tr key="Data result">
              <td>
                Data result: {data.result}
              </td>
            </tr>
            <tr key="Limit result">
              <td>
                Limit result: {data.limit}
              </td>
            </tr>
            <tr key="offset result">
              <td>
                offset result: {data.offset}
              </td>
            </tr>
            <tr key="Total result">
              <td>
                Total result: {data.total}
              </td>
            </tr>
            {data.data.map((ch:any) => (
              <tr key={ch.id}>
                <td>
                  Type: {ch.type}
                </td>
                <td>
                  id: {ch.id}
                </td>
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
    </>
  )

  
}

export {MangaChapters}