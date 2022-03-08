/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, Component} from 'react'
import Cover from '../Cover'
import {Link} from 'react-router-dom';
import getTitle from '../../helpers/getTitle';
import getChapterTitle from '../../helpers/getChapterTitle';
import ReadChapterButton from '../../common/ReadChapterButton';

type Props = {
  chapter:any
}

const Chapter: FC<Props> = ({chapter}) => {
  let scanlation_group = chapter.relationships.find((o:any) => o.type === "scanlation_group");
  let manga = chapter.relationships.find((o:any) => o.type === "manga");
  //let cover_art = chapter.relationships.find((o:any) => o.type === "cover_art");

  return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 ">
            <div className="row align-items-center">
              <div style={{height:"200px"}} className="col-md-6">
              <Cover height={100} width={100} manga_id={manga.id} relationships={chapter.relationships} conform={true}/>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12">
                  <Link className="text-center"
                    to={{
                      pathname: `/manga/${manga.id}`,
                      state: {
                          manga_id: manga.id
                      }
                    }}>{getTitle(manga.attributes.title)}</Link>
                    <br />
                    <hr />
                      {scanlation_group?(<Link className="text-center"
                      to={{
                        pathname: `/scangroup/${scanlation_group.id}`,
                        state: {
                          scangroup: scanlation_group
                        }
                      }}>{scanlation_group.attributes.name}</Link>):<>No Scan group</>}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                  <hr />
                    <ReadChapterButton chapter={chapter}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>            
  )
}

export default Chapter;