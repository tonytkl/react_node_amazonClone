import "./App.css";
import MainNavbar from "./pages/MainNavbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainNavbar />
      </div>
    </BrowserRouter>
  );
}

export default App;
