import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Post from "./components/Post";
import ImageUploader from "./pages/Upload";
import EditPost from "./components/EditPost";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<ImageUploader />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="*" element={<>page not found</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
