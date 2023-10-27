import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Boards from "./pages/Boards";
import BoardList from "./pages/ListPage";

function App() {
  // console.log(process.env.REACT_APP_API_KEY)
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<BoardList />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
