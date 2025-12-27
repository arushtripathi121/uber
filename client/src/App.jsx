import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Auth from "./pages/Auth";
import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/AuthContext";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
}

export default App;
