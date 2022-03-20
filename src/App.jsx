import { Routes, Route } from "react-router-dom";
import CategoryDropdown from "./components/home/CategoryDropdown";
import Home, { MasonryWrapper } from "./components/home/Home";
import MediaViewer from "./components/masonry/MediaViewer";
import { categories } from "./media";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="/img/:imgid" element={<Home />} />
                <Route path="/gallery/:category" element={<Home />} />
            </Route>
        </Routes>
    )
}

export default App;
