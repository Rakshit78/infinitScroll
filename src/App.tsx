import './App.css';
import { Button } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import List from './components/List';
import Jsondata from './components/Jsondata';

function App() {
  const navigate = useNavigate();
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/json' element={<Jsondata />} />
      </Routes>
    </div>
  );
}

export default App;
