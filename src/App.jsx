import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

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
