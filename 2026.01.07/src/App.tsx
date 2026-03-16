import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Categories from "./pages/Categories/Categories"
import Post from "./pages/Post/Post"

function App() {
  return (
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/post" element={<Post />} />
        </Routes>

      </BrowserRouter>
  )
}

export default App