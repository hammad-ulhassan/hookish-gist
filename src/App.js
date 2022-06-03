import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RoutePaths } from './RoutePaths/RoutePaths';

function App() {
  return (
    <BrowserRouter>
      <RoutePaths/>
    </BrowserRouter>
  );
}

export default App;
