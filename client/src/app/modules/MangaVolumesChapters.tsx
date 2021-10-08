import {FC, useState, useEffect} from 'react'
import axios from 'axios'

type Props = {
  manga_id: string
}

function getMangaVolumesChapters(manga_id:string) {
  return axios.get<{volumes:any, result: any}>(`https://api.mangadex.org/manga/${manga_id}/aggregate`)
}

const MangaVolumesChapters: FC<Props> = ({manga_id}) => {

  const [isLoading, setLoading] = useState(true);
  // const [showSplashScreen, setShowSplashScreen] = useState(true)
  const [data, setData] = useState<any>();
  useEffect(() => {
      const Data = async () => {
        try {
          const response = await getMangaVolumesChapters(manga_id);
          // console.log("MangaVolumesChapt");
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
            {Object.keys(data.volumes).map(function(keyName, keyIndex) {
                return (
                    <tr key={keyName}>
                            Volume: {keyName}
                            {console.log(data.volumes[keyName])}
                            {Object.keys(data.volumes[keyName].chapters).map(function(keyNameC, keyIndexC) {
                                return (
                                    <tr key={keyNameC}>
                                            <td>Chapter: {keyNameC}</td>
                                            <td>Chapter Id: {data.volumes[keyName].chapters[keyNameC].id}</td>   
                                            {console.log(data.volumes[keyName].chapters[keyNameC])}
                                    </tr>
                                )
                            })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    </>
  )

  
}

export {MangaVolumesChapters}