import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <div>
      <AppRouter />
    </div>
  );
}

export default App;
