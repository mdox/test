import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { DriversPage } from "./pages/Drivers";
import { HomePage } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drivers" element={<DriversPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
