import { useRoutes } from 'react-router';
import './App.css';

import routes from './routes';

function App() {
  const RouteView = ()=>(useRoutes(routes));
  
  return (
    <div className="App">
      <RouteView/>
    </div>
  );
}

export default App;
