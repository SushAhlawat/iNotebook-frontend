import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';
import Notes from './components/Notes';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <NoteState>
    <Navbar/>
      <Routes>
        <Route exact path='/' element= {<Home/>}/>
        <Route exact path='/about' element= {<About/>}/>
        <Route exact path='/notes' element= {<Notes/>}/>
        <Route exact path='/login' element= {<Login/>}/>
        <Route exact path='/signup' element= {<Signup/>}/>
      </Routes>
    </NoteState> 
  );
}

export default App;
