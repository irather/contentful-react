import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Page from "./components/Page/Page";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Page homeFlag={true} />} />
        <Route path="/page/:title" element={<Page homeFlag={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
