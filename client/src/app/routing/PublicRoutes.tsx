import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import {SearchContent} from '../modules/SearchContent'
import {SearchBar} from '../modules/Search'
import {MangaPage} from '../modules/MangaPage'

export function PublicRoutes() {

  return (
      <Switch>
        <Route path='/' exact component={SearchBar} />
        <Route path='/search' exact component={SearchContent} />
        <Route path='/manga/:id' exact component={MangaPage} />
        {/*<Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Redirect to="/" />*/}
        
      </Switch>
  )
}
