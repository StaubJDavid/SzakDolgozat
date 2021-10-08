/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Cover} from '../Cover'

type Props = {
  passFc: any,
  id: string,
  title: string,
  status: string,
  relationships: any
}

const SearchResult: FC<Props> = ({passFc, id, title, status, relationships}) => {
  return (
      <tr key={id}>
        <td>
          <Cover height={75} width={75} manga_id={id} cover_id={relationships.find((o:any) => o.type === 'cover_art').id} />
        </td>
        <td onClick={() => {passFc(id)}}>
          {title}
        </td>
        <td>
          {status}
        </td>
      </tr>                
  )
}

//{passedFc, currentPage, total, limit, maxPage}
export {SearchResult}
