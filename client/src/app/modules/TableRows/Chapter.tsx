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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
              <Cover height={100} width={100} manga_id={manga.id} relationships={chapter.relationships} />
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

/*
    <div className="card card-body">
      <div className="row justify-content-md-center">
        <div className="d-flex justify-content-center col-md-2 align-self-center">
          <Cover height={50} width={50} manga_id={manga.id} relationships={chapter.relationships} />
        </div>
        <div className="col-sm-2 align-self-center">
          <Link className="text-center"
          to={{
            pathname: `/manga/${manga.id}`,
            state: {
                manga_id: manga.id
            }
          }}>{getTitle(manga.attributes.title)}</Link>
          <br />
          {scanlation_group?(<Link className="text-center"
          to={{
            pathname: `/scangroup/${scanlation_group.id}`,
            state: {
              scangroup: scanlation_group
            }
          }}>{scanlation_group.attributes.name}</Link>):<>No Scan group</>}
          <div><ReadChapterButton chapter={chapter}/></div>
        </div>
      </div>
        </div>*/