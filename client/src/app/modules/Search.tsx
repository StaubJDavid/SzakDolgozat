/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, FC} from 'react'
import axios from 'axios'
import {Link, useHistory } from 'react-router-dom'
import {Cover} from './Cover'

function getMangas(title:string) {
  return axios.get<{data:any, limit:any, offset:any, response:any, result: any, total:any}>('https://api.mangadex.org/manga', {params: {title: title, limit: 100}})
}

type Props = {
  className: string
}

const SearchBar: FC = () => {
  let history = useHistory();

  const [title, setTitle] = useState('')
  const [data, setData] = useState<[any]>();
  const [limit, setLimit] = useState<any>();
  const [offset, setOffset] = useState<any>();
  const [response, setResponse] = useState<any>();
  const [result, setResult] = useState<any>();
  const [total, setTotal] = useState<any>();
  const [cover, setCover] = useState<any>();
  const [loading, setLoading] = useState(true);

  function handleSearch() {
    console.log(`You clicked submit. ${title}`);
    setLoading(true);
    getMangas(title)
    .then(({data}) => {
      console.log(data.data);
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
      <button type="button" onClick={handleSearch} className="btn btn-primary">Search</button>
      <div>
        {loading === false && (<div>
          <div>
            <table>
              <tbody>
                <tr key="limit">Limit: {limit}</tr>
                <tr key="offset">Offset: {offset}</tr>
                <tr key="response">Response: {response}</tr>
                <tr key="result">Result: {result}</tr>
                <tr key="total">Total: {total}</tr>
              </tbody>
            </table>
          </div>
          <table>
            <tbody>
              {data?.map((d:any) => (
                <tr key={d.id}>
                  <td>
                    {d.id}
                  </td>
                  <td>
                    {d.type}
                  </td>
                  <td onClick={() => {onMangaNameClick(d.id);}}>
                    {d.attributes.title.en}
                  </td>
                  <td>
                    {d.attributes.status}
                  </td>
                  <td>
                    <Cover manga_id={d.id} cover_id={d.relationships.find((o:any) => o.type === 'cover_art').id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>)}
      </div>
      </div>
  )
}

export {SearchBar}
