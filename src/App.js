// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Edit from "./Pages/Edit";
import FourOFour from "./Pages/FourOFour";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";
import AlbumIndex from "./Pages/AlbumIndex";
import AlbumShow from "./Pages/AlbumShow";
import AlbumNew from "./Pages/AlbumNew";
import AlbumEdit from "./Pages/AlbumEdit"
// COMPONENTS
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={<Index  />} />
            <Route path="/albums" element={<AlbumIndex />} />
            <Route path="/songs/new" element={<New />} />
            <Route path="/albums/new" element={<AlbumNew />} />
            <Route exact path="/songs/:id" element={<Show />} />
            <Route exact path="/albums/:id" element={<AlbumShow />} />
            <Route path="/songs/:id/edit" element={<Edit />} />
            <Route path="/albums/:id/edit" element={<AlbumEdit />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
