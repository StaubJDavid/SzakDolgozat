import {FC, useState, useEffect} from 'react'
import axios from 'axios'
import {Cover} from './Cover'
import {MangaChapters} from './MangaChapters'

function getMangaPage(manga_id:string) {
  return axios.get<{data:any, limit:any, offset:any, response:any, result: any, total:any}>(`https://api.mangadex.org/manga/${manga_id}`)
}

const MangaPage: FC = () => {
  const pathString = window.location.pathname;
  // console.log(pathString.slice(6,pathString.length));
  console.log(pathString);

  const [isLoading, setLoading] = useState(true);
  // const [showSplashScreen, setShowSplashScreen] = useState(true)
  const [data, setData] = useState<any>();
  useEffect(() => {
      const Data = async () => {
        try {
          const response = await getMangaPage(pathString.slice(7,pathString.length));
          console.log("wasdasads");
          console.log(response.data);
          setData(response.data);
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
                <tr key="cover"><td><Cover width={10} height={10} manga_id={data.data.id} cover_id={data.data.relationships.find((o:any) => o.type === 'cover_art').id} /></td></tr>
                <tr key={data.data.id}>
                    <td>{data.data.attributes.title.en}</td>
                </tr>
                <tr key="description">
                    <td>{data.data.attributes.description.en}</td>
                </tr>
                <tr key="type">
                    <td>{data.data.attributes.type}</td>
                </tr>
                {data.data.attributes.tags.map((t:any) => (
                <tr key={t.id}>
                  <td>
                    {t.attributes.group}
                  </td>
                  <td>
                    {t.attributes.name.en}
                  </td>
                </tr>
                ))}
                {data.data.attributes.altTitles.map((at:any) => (
                <tr key={at.en}>
                  <td>
                    {at.en}
                  </td>
                </tr>
                ))}
                <tr key="lastupdate">
                    <td>{data.data.attributes.updatedAt}</td>
                </tr>
                <tr key="status">
                    <td>{data.data.attributes.status}</td>
                </tr>
                <tr key="originalLanguage">
                    <td>{data.data.attributes.originalLanguage}</td>
                </tr>
                <tr key="publicationDemographic">
                    <td>{data.data.attributes.publicationDemographic}</td>
                </tr>
                <tr key="createdAt">
                    <td>{data.data.attributes.createdAt}</td>
                </tr>
                <tr key="contentRating">
                    <td>{data.data.attributes.contentRating}</td>
                </tr>
            </tbody>
        </table>
        {/*<MangaVolumesChapters manga_id={data.data.id} />*/}
        <MangaChapters manga_id={data.data.id} />
    </>
  )

  
}

export {MangaPage}