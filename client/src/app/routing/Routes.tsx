import {FC} from 'react'
import {Switch} from 'react-router-dom'
import {PublicRoutes} from './PublicRoutes'
 
const Routes: FC = () => { 
  return (
    <Switch>
      <PublicRoutes />
    </Switch>
  )
}

export {Routes}
 