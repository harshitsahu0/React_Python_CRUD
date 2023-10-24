import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Employee from './Components/employees/Employee';

function App() {
    return (
      <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<NavBar/>}></Route>
      <Route path='/employee/:id/:cmpName' element={<Employee/>}></Route>
      </Routes>
      </BrowserRouter>
      </div>
    );
  }

export default App;