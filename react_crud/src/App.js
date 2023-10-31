import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Employee from './Components/employees/Employee';
import AddComplain from './Components/AddComplain/AddComplain';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>  
          <Route path='/' element={<NavBar />}></Route>
          <Route path='/employee/:id/:cmpName' element={<Employee />}></Route>
          <Route path='/empComplain/:id/:empName' element={<AddComplain />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;