import {Route, Switch} from 'react-router-dom'

import {SearchContent} from '../modules/SearchContent'
import {SearchBar} from '../modules/Search'
import {MangaPage} from '../modules/MangaPage'
import { MangaReadPage } from '../modules/MangaReadPage'
import { ParentTest } from '../modules/ParentTest'

export function PublicRoutes() {

  return (
      <Switch>
        <Route path='/' exact component={SearchBar} />
        <Route path='/search' exact component={SearchContent} />
        <Route path='/manga/:id' exact component={MangaPage} />
        <Route path='/manga/read/:chapterid' exact component={MangaReadPage} />
        <Route path='/test' exact component={ParentTest} />        
      </Switch>
  )
}
