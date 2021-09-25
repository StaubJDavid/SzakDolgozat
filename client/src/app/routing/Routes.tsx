/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

 import React, {FC} from 'react'
 import {Redirect, Switch, Route} from 'react-router-dom'
 import {PublicRoutes} from './PublicRoutes'
 
 const Routes: FC = () => { 
   return (
     <Switch>
       <PublicRoutes />
     </Switch>
   )
 }
 
 export {Routes}
 