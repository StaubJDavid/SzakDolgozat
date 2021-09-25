import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom'

import {SearchBar} from './modules/Search'
import {SearchContent} from './modules/SearchContent'
import {Routes} from './routing/Routes'

type Props = {
  basename: string
}

const App: React.FC<Props> = ({basename}) =>  {
  return (
    <BrowserRouter basename={basename}>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
