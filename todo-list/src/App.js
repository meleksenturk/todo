import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import AddNotePage from "./pages/AddNotePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div >

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          {/* <Route path="/homePage" element={<HomePage />}></Route> */}
          <Route path="/add-todo" element={<AddNotePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
