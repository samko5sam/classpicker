import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages";

function App() {
  return (
    <>
      <HashRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
