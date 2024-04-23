import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Page from "./components/Page";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page/:title" element={<Page />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
