import React, {useRef} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
//import {withRouter} from 'react-router';

import {Routes} from './routing/Routes'
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {SearchContent} from './modules/SearchContent'
import Search from './modules/Search'
import MangaPage from './modules/MangaPage'
import MangaReadPage from './modules/MangaReadPage'
import { ParentTest } from './modules/ParentTest'
import Login from './modules/auth/Login'
import Register from './modules/auth/Register'
import Profile from './modules/Profile/Profile'
import Threads from './modules/Thread/Threads';
import Thread from './modules/Thread/Thread';
import { clearProfile } from './actions/profileActions';
import Creator from './common/Creator';
import ScanGroup from './common/ScanGroup';
import ChatPage from './modules/ChatPage';

import {io} from 'socket.io-client';

import Test from './modules/Test';

type State = {
  basename: string
}

if(localStorage.JWT){
  setAuthToken(localStorage.JWT);
  const decoded:any = jwt_decode(localStorage.JWT);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now()/1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    store.dispatch(clearProfile());
    window.location.href = '/';
  }
  /*const socket:any = {};
  socket.current = io("http://localhost:3001");*/
}

const App: React.FC<State> = ({basename}) =>  {
  return (
    <div className="bg-black">
    <Provider store={store}>
      <Router basename={basename}>
        <Navbar />
        {/*<Routes />*/}
        <Route path='/' exact component={withRouter(Landing)} />
        <div className="container p-0 bg-black">{/*container-fluid p-0 */}
          <Route path='/search' exact component={Search} />
          <Route path='/manga/:id' exact component={withRouter(MangaPage)} />
          <Route path='/manga/read/:chapterid' exact component={MangaReadPage} />
          <Route path='/register' exact component={Register} /> 
          <Route path='/login' exact component={Login} />
          <Route path='/profile/:id' exact component={withRouter(Profile)} />
          <Route path='/threads' exact component={Threads} />
          <Route path='/thread/:thread_id' exact component={Thread} />
          <Route path='/chat' exact component={ChatPage} />
          <Route path='/god/:creator_id' exact component={Creator} />
          <Route path='/scangroup/:scangroup_id' exact component={ScanGroup} />
        </div>
        
        {/*<Footer />*/}
    </Router>
    </Provider>
    </div>
  );
}

export default App;
