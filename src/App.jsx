import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import BoardsPage from './pages/BoardsPage';
import TasksPage from './pages/TasksPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <BoardsPage/> } />
          <Route path="/boards" element={ <TasksPage/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
