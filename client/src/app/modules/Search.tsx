import {useState, FC} from 'react'
import axios from 'axios'
import {useHistory } from 'react-router-dom'
import { PageNavBar } from './PageNavBar';
import { SearchResult } from './TableRows/SearchResult';

function getMangas(title:string, offset:number) {
  return axios.get<{data:any, limit:any, offset:any, response:any, result: any, total:any}>('https://api.mangadex.org/manga', {params: {title: title, limit: 20, offset: offset}})
}

type Props = {
  className: string
}

const SearchBar: FC = () => {
  let history = useHistory();


  const [currentPage, setCurrentPage] = useState(1);
  const [title, setTitle] = useState('')
  const [data, setData] = useState<[any]>();
  const [limit, setLimit] = useState<any>();
  const [offset, setOffset] = useState<any>();
  const [response, setResponse] = useState<any>();
  const [result, setResult] = useState<any>();
  const [total, setTotal] = useState<any>();
  const [cover, setCover] = useState<any>();
  const [loading, setLoading] = useState(true);

  function handleSearch(page:number) {
    console.log(`Page number: ${page}`);
    setLoading(true);
    setCurrentPage(page);

    getMangas(title,(page - 1)*10)
    .then(({data}) => {
      // console.log(data.data);
      setData(data.data);
      setLimit(data.limit);
      setOffset(data.offset);
      setResponse(data.response);
      setResult(data.result);
      setTotal(data.total);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error.response.status);     
      setLoading(true);   
    })
  }

  function onMangaNameClick(manga_id:string){
    history.push(`/manga/${manga_id}`);
  }

  return (
    <div>
      <label className="form-label">Search</label>
      <input type="text" onChange={event => setTitle(event.target.value)} className="form-control" id="SearchBar" placeholder="Manga name" />
      <button type="button" onClick={() => handleSearch(1)} className="btn btn-primary">Search</button>
      <div>
        {loading === false && (<div>
          <table>
            <tbody>
              {data?.map((d:any) => (
                <SearchResult passFc={onMangaNameClick} id={d.id} title={d.attributes.title.en} status={d.attributes.status} relationships={d.relationships}/>
              ))}                  
            </tbody>
          </table>
      </div>)}
      </div>
        {loading === false && (<PageNavBar passedFc={handleSearch} currentPage={currentPage} total={total} limit={limit} maxPage={Math.trunc(total/limit) + 1} />)}
      </div>
  )
}

//{passedFc, currentPage, total, limit, maxPage}
export {SearchBar}
