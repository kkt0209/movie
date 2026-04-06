import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Home from 'pages/common/Home';
import Navbar from 'components/common/Navbar';
import Login from 'pages/common/Login';
import Signup from 'pages/common/Signup';

import MovieList from 'pages/movie/MovieList';
import MovieDetail from 'pages/movie/MovieDetail';
import MovieGenre from 'pages/movie/MovieGenre';

import PersonDetail from 'pages/person/PersonDetail';
import useAppStore from 'store/useAppStore';

function App() {
  const initApp = useAppStore((state) => state.initApp);
    
  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

        <Route path='/movie' element={<MovieList/>}/>
        <Route path='/movie/:id' element={<MovieDetail/>}/>
        <Route path="/movie/genre/:id" element={<MovieGenre/>}/>

        <Route path='/person/:id' element={<PersonDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
