import { Routes, Route } from "react-router-dom";
import CategoryDropdown from "./components/home/CategoryDropdown";
import Home, { MasonryWrapper } from "./components/home/Home";
import MediaViewer from "./components/masonry/MediaViewer";
import { categories } from "./media";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
                <Route path="dropdown" element={<CategoryDropdown categories={categories} />} />
            </Route>
            <Route path="/img/:imgid" element={<Home />} />
            <Route path="/gallery/:category" element={<Home />} />
        </Routes>
    )
}

export default App;
