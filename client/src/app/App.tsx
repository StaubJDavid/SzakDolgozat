import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'

import {Routes} from './routing/Routes'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) =>  {
  return (
    <BrowserRouter basename={basename}>
      <Navbar bg="light" expand="lg" expanded={false}>
          <Navbar.Brand href="#home">Project Reader</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
