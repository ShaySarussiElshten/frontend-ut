import { BrowserRouter } from 'react-router-dom';
import Router from '@/router/router';
import { Navigation } from './components/Navigation';


function App() {
  return (
    <BrowserRouter>
      <div className='bg-gray-900 h-screen'>
        <Navigation />
        <div className="xl:pl-72 bg-gray-900">
          <Router />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;