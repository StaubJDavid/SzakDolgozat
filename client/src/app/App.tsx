import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';

import {Routes} from './routing/Routes'
import Navbar from './layout/Navbar';
import Landing from './layout/Landing';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import {SearchContent} from './modules/SearchContent'
import {SearchBar} from './modules/Search'
import {MangaPage} from './modules/MangaPage'
import { MangaReadPage } from './modules/MangaReadPage'
import { ParentTest } from './modules/ParentTest'
import Login from './modules/auth/Login'
import Register from './modules/auth/Register'
import Profile from './modules/Profile'

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
    window.location.href = '/';
  }
}

const App: React.FC<State> = ({basename}) =>  {
  return (
    <Provider store={store}>
      <Router basename={basename}>
        {/* <Navbar bg="light" expand="lg" expanded={false}>
            <Navbar.Brand href="#home">Project Reader</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbar-collapse">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar> */}
        <Navbar />
        {/*<Routes />*/}
        <Route path='/' exact component={Landing} />
        <div className="container">
          <Route path='/search' exact component={SearchBar} />
          <Route path='/manga/:id' exact component={MangaPage} />
          <Route path='/manga/read/:chapterid' exact component={MangaReadPage} />
          <Route path='/test' exact component={ParentTest} /> 
          <Route path='/register' exact component={Register} /> 
          <Route path='/login' exact component={Login} />
          <Route path='/profile' exact component={Profile} />
        </div>
        
        {/*<Footer />*/}
    </Router>
    </Provider>
  );
}

export default App;
